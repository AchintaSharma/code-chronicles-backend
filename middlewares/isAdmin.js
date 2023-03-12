const User = require("../models/user.model");
const { userType } = require("../utils/constants");

const isAdmin = (req, res, next) => {
  const user = req.user;

  if (user && user.userType == userType.admin) {
    next();
  } else {
    return res.status(200).send({
      message: "Only Admin user is allowed to access this endpoint.",
    });
  }
};

module.exports = {
  isAdmin,
};
