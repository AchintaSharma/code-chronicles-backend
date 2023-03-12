const authController = require("../controllers/auth.controller");
const {
  validateSignUpRequestBody,
  validateLogInRequestBody,
} = require("../middlewares/validateRequestBody");

module.exports = (app) => {
  app.post(
    "/cc/api/v1/auth/signup",
    validateSignUpRequestBody,
    authController.signUp
  );

  app.get(
    "/cc/api/v1/auth/login",
    validateLogInRequestBody,
    authController.login
  );
};
