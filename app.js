const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const flowerRouter = require("./routers/flower.router")

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    if (err) {
      res.status(400).json({ error: "Invalid Request data" });
    } else {
      next();
    }
  });

  app.use(cors());

  app.use(flowerRouter);

  app.listen(8080, () => {
    console.log("Server running on localhost:8080");
  });