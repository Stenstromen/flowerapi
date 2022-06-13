const express = require("express");

const flowerController = require("../controllers/flower.controller");
const flowerRouter = express.Router();
const { check, param } = require("express-validator");

flowerRouter.get("/readme", flowerController.sendReadme);
flowerRouter.get("/assets/img/:filename", flowerController.sendPic);
flowerRouter.get("/flowers", flowerController.allFlowers);
flowerRouter.get("/flowers/:id", flowerController.oneFlower);
flowerRouter.post("/flowers", flowerController.postFlower);
flowerRouter.put("/flowers/:id", flowerController.putFlower);
flowerRouter.patch("/flowers/:id", flowerController.patchFlower);
flowerRouter.delete("/flowers/:id", flowerController.deleteFlower);

module.exports = flowerRouter;