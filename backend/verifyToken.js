const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  !token && res.status(401).json("You are not authenticated!");

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    err && res.status(403).json("Token í not valid");
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
