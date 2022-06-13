const express = require("express");

const flowerController = require("../controllers/flower.controller");
const flowerRouter = express.Router();
const { check, param } = require("express-validator");

flowerRouter.get("/readme", flowerController.sendReadme);
flowerRouter.get("/assets/img/:filename", flowerController.sendPic);
flowerRouter.get("/flowers", flowerController.allFlowers);
flowerRouter.get(
  "/flowers/:id",
  [param("id", "ID has to be INT!").isInt()],
  flowerController.oneFlower
);
flowerRouter.post(
  "/flowers",
  [
    check("name", "Name must be at least one char in length!").not().isEmpty(),
    check("name", "Name must be a string!").isString(),
    check("description", "Description must be at least one char in length!")
      .not()
      .isEmpty(),
    check("description", "Description must be a string!").isString(),
    check("author", "Author must be at least one char in length!")
      .not()
      .isEmpty(),
    check("author", "Author must be a string!").isString(),
    check("imageUrl", "imageUrl must be at least one char in length!")
      .not()
      .isEmpty(),
    check("imageUrl", "imageUrl must be a string!").isString(),
  ],
  flowerController.postFlower
);
flowerRouter.put(
  "/flowers/:id",
  [
    param("id", "ID has to be INT!").isInt(),
    check("name", "Name must be at least one char in length!").not().isEmpty(),
    check("name", "Name must be a string!").isString(),
    check("description", "Description must be at least one char in length!")
      .not()
      .isEmpty(),
    check("description", "Description must be a string!").isString(),
    check("author", "Author must be at least one char in length!")
      .not()
      .isEmpty(),
    check("author", "Author must be a string!").isString(),
    check("imageUrl", "imageUrl must be at least one char in length!")
      .not()
      .isEmpty(),
    check("imageUrl", "imageUrl must be a string!").isString(),
  ],
  flowerController.putFlower
);
flowerRouter.patch(
  "/flowers/:id",
  [
    param("id", "ID has to be INT!").isInt(),
    check("name", "Name must be at least one char in length!")
      .not()
      .isEmpty()
      .optional(),
    check("name", "Name must be a string!").isString().optional(),
    check("description", "Description must be at least one char in length!")
      .not()
      .isEmpty()
      .optional(),
    check("description", "Description must be a string!").isString().optional(),
    check("author", "Author must be at least one char in length!")
      .not()
      .isEmpty()
      .optional(),
    check("author", "Author must be a string!").isString().optional(),
    check("imageUrl", "imageUrl must be at least one char in length!")
      .not()
      .isEmpty()
      .optional(),
    check("imageUrl", "imageUrl must be a string!").isString().optional(),
  ],
  flowerController.patchFlower
);
flowerRouter.delete(
  "/flowers/:id",
  [param("id", "ID has to be INT!").isInt()],
  flowerController.deleteFlower
);

module.exports = flowerRouter;
