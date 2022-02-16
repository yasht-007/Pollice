const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.json({ status: "error", error: "No token provided" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ status: "error", error: "Invalid token" });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

module.exports = jwtVerify;
