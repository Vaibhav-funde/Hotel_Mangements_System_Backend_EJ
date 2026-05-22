
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
const token = req.headers.authorization;
if (!token) return res.status(401).json({ message: "No token" });
const decoded = jwt.verify(token.split(" ")[1], "secret123");
  req.user = decoded;
  next();
};