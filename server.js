const http = require("http");
const port = 8080;
const fs = require("fs");
const db = "assets/store/flowers.json";
const readme = "assets/store/readme.txt";

const server = http.createServer((req, res) => {
  const items = req.url.split("/");
  console.log(items);
  const hostheader = req.headers.host;

  if (req.method === "GET" && items[1] === "assets" && items[2] === "img" && items.length === 4) {
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
      res.end(JSON.stringify(printdata[randomobj]).replace("HOSTNAME", "http://" + hostheader));
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
        res.end(JSON.stringify(reqOb).replace("HOSTNAME", "http://" + hostheader));
      } else {
        res.statusCode = 404;
        res.write("Not found");
        res.end();
      }
    });
  } else if (
    req.method === "GET" &&
    items[1] === "api" &&
    items[2] === "name" &&
    items.length === 4
  ) {
    fs.readFile(db, "utf8", (err, data) => {
      const objects = JSON.parse(data);
      const reqNm = items[3];
      const reqOb = objects.find((thing) => thing.name === reqNm);

      if (reqOb) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(reqOb).replace("HOSTNAME", "http://" + hostheader));
      } else {
        res.statusCode = 404;
        res.write("Not found");
        res.end();
      }
    });
  } else if (
    req.method === "GET" &&
    items[1] === "api" &&
    items[2] === "desc" &&
    items.length === 4
  ) {
    fs.readFile(db, "utf8", (err, data) => {
      const objects = JSON.parse(data);
      const reqDe = items[3];
      const reqOb = objects.find((thing) => thing.description === reqDe);

      if (reqOb) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(reqOb).replace("HOSTNAME", "http://" + hostheader));
      } else {
        res.statusCode = 404;
        res.write("Not found");
        res.end();
      }
    });
  } else if (
    req.method === "GET" &&
    items[1] === "api" &&
    items[2] === "author" &&
    items.length === 4
  ) {
    fs.readFile(db, "utf8", (err, data) => {
      if (err) return console.log(err);

      const objects = JSON.parse(data);
      const reqAu = items[3];
      const reqOb = objects.find((thing) => thing.author === reqAu);

      if (reqOb) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(reqOb).replace("HOSTNAME", "http://" + hostheader));
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
      inputdata.push(JSON.parse(post));

      if (typeof JSON.parse(post).id === "string") {
        console.log(
          'Field "id" cannot be type "string"' + "\n" + "Please see /api/readme"
        );
        res.statusCode = 400; // Bad request, https://http.cat/400
        res.end();
        parseInt(JSON.parse(post).id);
      } else {
        res.statusCode = 201; // Created, https://http.cat/201
        fs.writeFile(db, JSON.stringify(inputdata, null, "   "), (err) => {
          if (err) {
            console.error("Shit happens");
          }
        });
        console.log(hostheader);
        res.end();
      }
    });
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
