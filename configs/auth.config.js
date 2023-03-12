require("dotenv").config();

module.exports = {
  secret: process.env.AUTH_SECRET,
  salt: process.env.SALT,
  jwtExpiryTime: process.env.JWT_EXPIRY_TIME,
};
