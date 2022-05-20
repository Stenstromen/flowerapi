const http = require("http")

const port = 8080;
const fs = require("fs");
const db = "flowers.json"
const readme = "readme.txt"

const server = http.createServer((req, res) => {
    const items = req.url.split("/");

    if (req.method === "GET" && items[1] === "api" && items[2] === "rnd" && items.length === 3) {
        fs.readFile(db, "utf8", (err, data) => {
            const printdata = JSON.parse(data)
            const randomize = Math.random() * printdata.length;
            const randomobj = Math.floor(randomize)
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(printdata[randomobj]))
        });
    } else if (req.method === "GET" && items[1] === "api" && items[2] === "id" && items.length === 4) {
        fs.readFile(db, "utf8",(err, data) => {
            const objects = JSON.parse(data);
            const reqId = parseInt(items[3]);
            const reqOb = objects.find((thing) => thing.id === reqId);

            if (reqOb) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(reqOb))
            } else {
                res.statusCode = 404
                res.write("Not found")
                res.end();
            }
        });
    } else if (req.method === "GET" && items[1] === "api" && items[2] === "name" && items.length === 4) {
        fs.readFile(db, "utf8",(err, data) => {
            const objects = JSON.parse(data);
            const reqNm = items[3];
            const reqOb = objects.find((thing) => thing.name === reqNm);

            if (reqOb) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(reqOb))
            } else {
                res.statusCode = 404
                res.write("Not found")
                res.end();
            }
        });
    } else if (req.method === "GET" && items[1] === "api" && items[2] === "desc" && items.length === 4) {
        fs.readFile(db, "utf8",(err, data) => {
            const objects = JSON.parse(data);
            const reqDe = items[3];
            const reqOb = objects.find((thing) => thing.description === reqDe);

            if (reqOb) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(reqOb))
            } else {
                res.statusCode = 404
                res.write("Not found")
                res.end();
            }
        });
    } else if (req.method === "GET" && items[1] === "api" && items[2] === "author" && items.length === 4) {
        fs.readFile(db, "utf8",(err, data) => {
            const objects = JSON.parse(data);
            const reqAu = items[3];
            const reqOb = objects.find((thing) => thing.author === reqAu);

            if (reqOb) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(reqOb))
            } else {
                res.statusCode = 404
                res.write("Not found")
                res.end();
            }
        });
    } else if (req.method === "GET" && items[1] === "api" && items[2] === "readme" && items.length === 3) {
        fs.readFile(readme, "utf8", (err, data) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain");
            res.end(data);
        });
    } else if (req.method === "GET" && items[0] === "" || req.method === "GET" && items[0] === "" && items[1] === "api" && items.length === 2) {
        res.writeHead(301, {"Location": "/api/readme"});
        res.end();
    } else if (err) {
        console.log(err);
        res.statusCode = 500;
        res.end()
        throw err; 
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})