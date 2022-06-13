const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  console.log(token);

  if (!token) {
    return res.status(403).json({error: "Forbidden"});
  }

  const [prefix, jwtToken] = token.split(" ");

  try {
    const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(400).json({error: "Invalid token"});
  }

  next();
}

module.exports = verifyToken;
