const express = require("express");

const flowerController = require("../controllers/flower.controller");
const flowerRouter = express.Router();
const { check, param } = require("express-validator");

flowerRouter.get("/readme", flowerController.sendReadme);
flowerRouter.get("/assets/img/", flowerController.sendPic);
flowerRouter.get("/", flowerController.allFlowers);

module.exports = flowerRouter;