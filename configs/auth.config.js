require("dotenv").config();

module.exports = {
  secret: process.env.AUTH_SECRET,
  salt: process.env.SALT,
};
