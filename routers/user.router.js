const express = require("express");

const userController = require("../controllers/user.controller");
const userRouter = express.Router();
const loginRequired = require("../middlewares/auth.middleware");

userRouter.post("/register", userController.userRegister);
userRouter.post("/login", userController.userLogin)
userRouter.get("/welcome", loginRequired, userController.userWelcome)

module.exports = userRouter;