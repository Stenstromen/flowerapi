const flowerdb = require("../models/flower.model");
const printReadme = require("../models/flower.model");
const getPic = require("../models/flower.model");
const { validationResult } = require("express-validator");
const fs = require("fs");
const { resolveSoa } = require("dns");

function sendPic(req, res) {
  fs.readFile("." + req.url, (err, data) => {
    if (err) {
      console.log(JSON.stringify(err))
      res.status(404).json({ error: "Not found"})
      return;
    }
    //res.set("Content-Encoding", "gzip");
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(data);
  });
}

function sendReadme(req, res) {
  //res.status(200).write(printReadme.printReadme);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(printReadme.printReadme);
}

function allFlowers(req, res) {
  const hostheader = req.headers.host;
  let sql = `select * from flowers`;
  let params;
  flowerdb.flowerdb.all(sql, params, (err, data) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    let resdata = data;
    for (let i = 0; i < data.length; i++) {
      resdata[i].imageUrl = resdata[i].imageUrl.replace(
        "HOSTNAME",
        "http://" + hostheader
      );
    }

    res.status(200).json(resdata);
  });
}

function randomFlowers(req, res) {
  const hostheader = req.headers.host;
  let sql = `select * from flowers`;
  let params;
  flowerdb.flowerdb.all(sql, params, (err, data) => {
    if (err) {
      res.status(400).json({ error: err.message + "lol"});
      return;
    }

    console.log("data");
    let resdata = data;
    let randomize = Math.random() * resdata.length;
    let randomobj = Math.floor(randomize);
    let randomflowerres = resdata[randomobj];
    randomflowerres.imageUrl = randomflowerres.imageUrl.replace("HOSTNAME", "http://" + hostheader);

    res.status(200).json(randomflowerres);
  });
}

function oneFlower(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors[0].author });
  }

  const hostheader = req.headers.host;
  let sql = `select * from flowers WHERE id = ${req.params.id}`;
  let params;
  flowerdb.flowerdb.all(sql, params, (err, data) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    let resdata = data[0];
    resdata.imageUrl = resdata.imageUrl.replace(
      "HOSTNAME",
      "http://" + hostheader
    );

    res.status(200).json(resdata);
  });
}

function postFlower(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ "errors": extractedErrors[0] });
  }

  let { name, description, author, imageUrl } = req.body;
  let params;
  const insert =
    "INSERT INTO flowers (name, description, author, imageUrl) VALUES (?,?,?,?)";
  flowerdb.flowerdb.run(insert, [
    `${name}`,
    `${description}`,
    `${author}`,
    `${imageUrl}`,
  ]);
  let sql = `SELECT * FROM flowers WHERE name LIKE "${name}" AND description LIKE "${description}" AND author LIKE "${author}" and imageUrl LIKE "${imageUrl}"`;
  flowerdb.flowerdb.all(sql, params, (err, data) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.status(201).json(data[0]);
  });
}

function putFlower(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors[0].name });
  }

  let { name, description, author, imageUrl } = req.body;
  let sql = `SELECT * FROM flowers WHERE id = ${req.params.id}`;
  let params;

  flowerdb.flowerdb.all(sql, params, (err, data) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (data[0]) {
      const update = `UPDATE flowers SET name=?, description=?, author=?, imageUrl=? WHERE id = ${req.params.id}`;
      flowerdb.flowerdb.run(update, [
        `${name}`,
        `${description}`,
        `${author}`,
        `${imageUrl}`,
      ]);
      res.statusCode = 201;
      res.end();
    } else {
      res.status(404).json({ error: `ID ${req.params.id} does not exist` });
      return;
    }
  });
}

function patchFlower(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors[0].name });
  }

  let { name, description, author, imageUrl } = req.body;
  let sql = `SELECT * FROM flowers WHERE id = ${req.params.id}`;
  let params;
  let dbObj;

  flowerdb.flowerdb.all(sql, params, (err, data) => {
    if (data[0]) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      dbObj = data[0];

      if (name) {
        dbObj.name = name;
      }
      if (description) {
        dbObj.description = description;
      }
      if (author) {
        dbObj.author = author;
      }
      if (imageUrl) {
        dbObj.imageUrl;
      }

      const patch = `UPDATE flowers SET name=?, description=?, author=?, imageUrl=? WHERE id = ${req.params.id}`;
      flowerdb.flowerdb.run(patch, [
        `${dbObj.name}`,
        `${dbObj.description}`,
        `${dbObj.author}`,
        `${dbObj.imageUrl}`,
      ]);
      res.statusCode = 200;
      res.end();
    } else {
      res.status(404).json({ error: `ID ${req.params.id} does not exist` });
      return;
    }
  });
}

function deleteFlower(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors[0].name });
  }

  let sql = `SELECT * FROM flowers WHERE id = ${req.params.id}`;
  let params;
  flowerdb.flowerdb.all(sql, params, (err, data) => {
    if (data[0]) {
      if (err) {
        res.status(400).json({ error: err.message});
        return;
      }
      const remove = `DELETE FROM flowers WHERE id = ${req.params.id}`;
      flowerdb.flowerdb.run(remove);
      res.status(200).json({ info: `FLower ID ${req.params.id} has been deleted` });
    } else {
      res.status(404).json({ error: `ID ${req.params.id} does not exist`});
      return;
    }
  })
}

module.exports = {
  sendPic,
  sendReadme,
  allFlowers,
  randomFlowers,
  oneFlower,
  postFlower,
  putFlower,
  patchFlower,
  deleteFlower
};
