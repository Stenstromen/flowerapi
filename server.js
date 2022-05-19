const http = require("http")

const hostname = "localhost";
const port = 8080;
const fs = require("fs");
const db = "flowers.json"

const server = http.createServer((req, res) => {
    const items = req.url.split("/");

    //api/rnd               \
    //api/flw/shortname     \ End goal

    //GET /api/rnd
    if (req.method === "GET" && items[2] === "rnd" && items.length === 3) {
        fs.readFile(db, "utf8", function(err, data) {
            const printdata = JSON.parse(data)
            const randomize = Math.random() * printdata.length;
            const randomobj = Math.floor(randomize)

            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.end()
                throw err;
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(printdata[randomobj]))
                console.log(printdata[randomobj].name); //DEBUG
            }
        })
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running http://${hostname}:${port}`);
})