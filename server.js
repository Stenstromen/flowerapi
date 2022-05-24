const http = require("http");
const port = 8080;
const fs = require("fs");
const db = "assets/store/flowers.json";
const readme = "assets/store/readme.txt";

const server = http.createServer((req, res) => {
  const items = req.url.split("/");
  const hostheader = req.headers.host;

  if (
    req.method === "GET" &&
    items[1] === "assets" &&
    items[2] === "img" &&
    items.length === 4
  ) {
    console.log(__dirname + req.url);
    fs.readFile(__dirname + req.url, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end(JSON.stringify(err));
        return;
      }
      res.statusCode = 200;
      res.end(data);
    });
  } else if (
    req.method === "GET" &&
    items[1] === "api" &&
    items[2] === "rnd" &&
    items.length === 3
  ) {
    console.log(req.url);
    fs.readFile(db, "utf8", (err, data) => {
      const printdata = JSON.parse(data);
      const randomize = Math.random() * printdata.length;
      const randomobj = Math.floor(randomize);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify(printdata[randomobj]).replace(
          "HOSTNAME",
          "http://" + hostheader
        )
      );
    });
  } else if (
    req.method === "GET" &&
    items[1] === "api" &&
    items[2] === "all" &&
    items.length === 3
  ) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    fs.readFile(db, "utf8", (err, data) => {
      //
      // Big ass todo!
      let old = JSON.stringify(data).replace("HOSTNAME", "poo");
      let newarr = JSON.parse(old);

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(newarr);
    });
  } else if (
    req.method === "GET" &&
    items[1] === "api" &&
    items[2] === "id" &&
    items.length === 4
  ) {
    fs.readFile(db, "utf8", (err, data) => {
      const objects = JSON.parse(data);
      const reqId = parseInt(items[3]);
      const reqOb = objects.find((thing) => thing.id === reqId);

      if (reqOb) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify(reqOb).replaceAll("HOSTNAME", "http://" + hostheader)
        );
      } else {
        res.statusCode = 404;
        res.write("Not found");
        res.end();
      }
    });
  } else if (
    req.method === "GET" &&
    items[1] === "api" &&
    items[2] === "readme" &&
    items.length === 3
  ) {
    fs.readFile(readme, "utf8", (err, data) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(data);
    });
  } else if (
    (req.method === "GET" && items[0] === "") ||
    (req.method === "GET" &&
      items[0] === "" &&
      items[1] === "api" &&
      items.length === 2)
  ) {
    res.writeHead(301, { Location: "/api/readme" });
    res.end();
  } else if (
    req.method === "DELETE" &&
    items[1] === "api" &&
    items[2] === "id" &&
    items.length === 4
  ) {
    const post = items[3];
    let inputdata = JSON.parse(fs.readFileSync(db));

    if (typeof JSON.parse(post).id === "string") {
      console.log(
        'Field "id" cannot be type "string"' + "\n" + "Please see /api/readme"
      );
      res.statusCode = 400; // Bad request, https://http.cat/400
      res.end();
      parseInt(JSON.parse(post).id);
    } else {
      res.statusCode = 200; // Created, https://http.cat/201

      const removeById = (id2delete, id) => {
        const requiredIndex = id2delete.findIndex((el) => {
          return el.id === parseInt(id);
        });
        if (requiredIndex === -1) {
          res.statusCode = 404;
          return false;
        }
        return !!inputdata.splice(requiredIndex, 1);
      };

      removeById(inputdata, post);

      fs.writeFile(db, JSON.stringify(inputdata, null, "   "), (err) => {
        if (err) {
          console.error("Shit happens");
        }
      });

      res.end();
    }
  } else if (
    req.method === "POST" &&
    items[1] === "api" &&
    items[2] === "add" &&
    items.length === 3
  ) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      let inputdata = JSON.parse(fs.readFileSync(db));
      let post = body;

      let getId = Math.floor(Math.random() * (100 - JSON.parse(fs.readFileSync(db)).length) + 1)
      let newinputdata = JSON.parse(post);
      newinputdata.id = getId;
      inputdata.push(newinputdata);
      inputdata.sort((a, b) => (a.id > b.id ? 1 : -1));
      res.statusCode = 201; // Created, https://http.cat/201
      fs.writeFile(db, JSON.stringify(inputdata, null, "   "), (err) => {
                    if (err) {
                        console.error("Shit happens");
                    }
                });
      res.end();
    });
  } else if (
    req.method === "PUT" &&
    items[1] === "api" &&
    items[2] === "add" &&
    items.length === 4
  ) {
    let body = "";
    const post = items[3];
    let inputdata = JSON.parse(fs.readFileSync(db));

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const putreq = JSON.parse(body);
      if (typeof JSON.parse(post).id === "string") {
        console.log(
          'Field "id" cannot be type "string"' + "\n" + "Please see /api/readme"
        );
        res.statusCode = 400; // Bad request, https://http.cat/400
        res.end();
        parseInt(JSON.parse(post).id);
      } else {
        res.statusCode = 200; // Created, https://http.cat/201

        const removeById = (id2delete, id) => {
          const requiredIndex = id2delete.findIndex((el) => {
            return el.id === parseInt(id);
          });
          if (requiredIndex === -1) {
            res.statusCode = 404;
            return false;
          }
          return !!inputdata.splice(requiredIndex, 1);
        };

        removeById(inputdata, post);

        inputdata.push(JSON.parse(body));
        inputdata.sort((a, b) => (a.id > b.id ? 1 : -1));

        fs.writeFile(db, JSON.stringify(inputdata, null, "   "), (err) => {
          if (err) {
            console.error("Shit happens");
          }
        });

        res.end();
      }
    });
  } else if (
    req.method === "PATCH" &&
    items[1] === "api" &&
    items[2] === "add" &&
    items.length === 4
  ) {
    let body = "";
    const post = items[3];
    let inputdata = JSON.parse(fs.readFileSync(db));

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      inputdataIndex = inputdata.findIndex((obj) => obj.id == post);

      if (JSON.parse(body).name) {
        inputdata[inputdataIndex].name = JSON.parse(body).name;
      }
      if (JSON.parse(body).description) {
        inputdata[inputdataIndex].description = JSON.parse(body).description;
      }
      if (JSON.parse(body).author) {
        inputdata[inputdataIndex].author = JSON.parse(body).author;
      }
      if (JSON.parse(body).imageUrl) {
        inputdata[inputdataIndex].imageUrl = JSON.parse(body).imageUrl;
      }

      fs.writeFile(db, JSON.stringify(inputdata, null, "   "), (err) => {
        if (err) {
          console.error("Shit happens");
        }
      });

      res.end();
    });
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
