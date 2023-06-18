const jwt = require("jsonwebtoken");
require("dotenv").config();

// verify token middleware
exports.verifyUser = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      res.locals.currentUser = data;
      res.locals.userId = data.userId;
      res.locals.token = token;
      next();
    }
  });
};
