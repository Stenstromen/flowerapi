const http = require("http")

const port = 8080;
const fs = require("fs");
const { blob } = require("stream/consumers");
const { stringify } = require("querystring");
const fw = fs.createWriteStream("test.json")
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
            if (err) return console.log(err);

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
    } else if (req.method === "POST" && items[1] === "api" && items[2] === "add" && items.length === 3) {
        console.log("Start");
        let body = "";

        req.on('data', chunk => {
            body += chunk;
          });

          req.on('end', () => {
            //const testfile = "test2.json"
            let inputdata = JSON.parse(fs.readFileSync(db));
            let post = body;
            inputdata.push(JSON.parse(post));

            // Need to reverse logic. IF-statement first, then fw.writeFile
            fs.writeFile(db, JSON.stringify(inputdata, null, '   '), (err) =>  {
                if (err) {
                    console.error("Shit happens")
                } else if (typeof JSON.parse(post).id === "string") { 
                    console.log("ID is string!")
                    res.statusCode = 503;
                    res.end()
                    parseInt(JSON.parse(post).id);
                }
                console.log(JSON.parse(post).id);
            });
            
            //console.log(inputdata);

            console.log("End");
            res.end();
          });
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})