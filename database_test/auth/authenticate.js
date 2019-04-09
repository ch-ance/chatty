const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_SECRET || "chance halo anthony embrey-farquhar";

const authenticate = (req, res, next) => {
  const token = req.get("Authorization");

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: "No token provided. Token must be set on the Authorization Header"
    });
  }
};

module.exports = {
  authenticate
};
