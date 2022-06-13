require("dotenv").config();
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const user = require("../models/user.model");

async function userRegister(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ info: "Input missing" });
  }

  const existingUser = await user.getOne(email);

  if (existingUser) {
    return res.status(400).json({ info: "User already exist" });
  }

  const newUser = {
    username,
    email,
    password: md5(password),
  };

  await user.addOne(newUser);

  res.json(newUser);
}

async function userLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email AND Password required" });
  }

  const existingUser = await user.getOne(email);

  if (!existingUser) {
    return res.status(404).json({ error: "User does not exist" });
  }
  const hashedPassword = md5(password);

  if (existingUser.password !== hashedPassword) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  const token = jwt.sign(
    {
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
    },
    process.env.SECRET_KEY
  );

  res.json(token);
}

async function userWelcome(req, res) {
  const result = await user.getAll();

  res.json({
    user: req.user,
    result,
  });
}

module.exports = {
  userRegister,
  userLogin,
  userWelcome,
};
