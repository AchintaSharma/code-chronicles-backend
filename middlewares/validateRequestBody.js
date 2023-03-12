const User = require("../models/user.model");
const { defaultUserType, userType } = require("../utils/constants");

const isValidEmail = (email) => {
  // checks valid email format
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const isValidPassword = (password) => {
  // checks password meets requirements
  return password.match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,25}$/
  );
};

const validateSignUpRequestBody = async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({
        message: "Signup failed! User name is not provided.",
      });
    }

    if (!req.body.email) {
      return res.status(400).send({
        message: "Signup failed! Email is not provided.",
      });
    }

    try {
      const user = await User.findOne({ email: req.body.email });

      if (user != null) {
        return res.status(400).send({
          message: "Signup failed! Email is already taken.",
        });
      }
    } catch (err) {
      return res.status(500).send({
        message: "Internal server error while validating the sign-up request.",
      });
    }

    if (!isValidEmail(req.body.email)) {
      return res.status(400).send({
        message: "Signup failed! Not a valid email id.",
      });
    }

    if (!req.body.password) {
      return res.status(400).send({
        message: "Signup failed! Password is not provided.",
      });
    }

    if (!isValidPassword(req.body.password)) {
      return res.status(400).send({
        message:
          "Signup failed! Not a valid password. Password must be 10 to 25 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.",
      });
    }

    if (!req.body.userType) {
      console.log(
        `User type not provided, setting default: ${defaultUserType}`
      );
    }

    if (req.body.userType === userType.admin) {
      return res.status(400).send({
        message: `Signup failed. Admin registration is not allowed.`,
      });
    }

    const userTypes = [userType.admin, userType.user];

    if (req.body.userType && !userTypes.includes(req.body.userType)) {
      return res.status(400).send({
        message: `Signup failed! User type provided is invalid. Possible values are: ${userType.admin}, ${userType.user}`,
      });
    }

    next();
  } catch (err) {
    console.log(
      "#### Error while validating sign-up request body ##### ",
      err.message
    );
    return res.status(500).send({
      message: "Internal server error occured while sign-up validation.",
    });
  }
};

const validateSignInRequestBody = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: "Failed! Email Id is not provided",
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "Failed! Password is not provided",
    });
  }

  next();
};

module.exports = {
  validateSignUpRequestBody,
  validateSignInRequestBody,
};
