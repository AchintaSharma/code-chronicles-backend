const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const { userType, userStatus } = require("./utils/constants");
const { salt } = require("./configs/auth.config");
module.exports = async () => {
  try {
    const user = await User.findOne({
      userType: "Admin",
    });

    if (user) {
      console.log(`#### ADMIN user is already present ####`);
      return;
    } else {
      console.log(salt);
      const user = await User.create({
        name: "Achinta Sharma",
        email: "23achinta@gmail.com",
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, parseInt(salt)),
        userType: userType.admin,
        userStatus: userStatus.registered,
        lastLogin: Date.now(), // TODO: Automate later
      });

      console.log("#### Admin user created ####");
    }
  } catch (err) {
    console.log("#### Error in DB initialization ####", err.message);
  }
};
