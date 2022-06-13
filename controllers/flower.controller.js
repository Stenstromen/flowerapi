const flowerdb = require("../models/flower.model");
const printReadme = require("../models/flower.model");
const getPic = require("../models/flower.model");
const { validationResult } = require("express-validator");
const fs = require("fs");
const dot = ".";

function sendPic(req, res) {
  fs.readFile(dot + req.url, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(data);
  });
}

function sendReadme(req, res) {
  console.log(printReadme.printReadme);
  res.status(200).write(printReadme.printReadme);
  res.end();
}

function allFlowers(req, res) {
  const hostheader = req.headers.host;
  let sql = `select * from flowers`;
  let params;
  let resdata = data;
  flowerdb.flowerdb.all(sql, params, (err, data) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    for (let i = 0; i < data.length; i++) {
        resdata[i].imageUrl = resdata[i].imageUrl.replace("HOSTNAME", "http://" + hostheader)
    }

    res.status(200).json(resdata);
  });
}

module.exports = {
  sendPic,
  sendReadme,
  allFlowers
};
