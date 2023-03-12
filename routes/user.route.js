const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/authjwt");
const { isAdmin } = require("../middlewares/isAdmin");

module.exports = (app) => {
  app.get(
    "/cc/api/v1/users",
    [verifyToken, isAdmin],
    userController.findAllUsers
  );
  app.get("/cc/api/v1/user/:id", [verifyToken], userController.findUser);
  app.put("/cc/api/v1/user/:id", [verifyToken], userController.updateUser);
  app.delete("/cc/api/v1/user/:id", [verifyToken], userController.deleteUser);
};
