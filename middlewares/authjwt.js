const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const authConfig = require("../configs/auth.config");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided! Access prohibited",
    });
  }

  jwt.verify(token, authConfig.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Invalid tokem. Unauthorised access!",
      });
    }

    const user = await User.findOne({ email: decoded.email });
    req.user = user; //saving user data in req
    next();
  });
};

module.exports = {
  verifyToken,
};
