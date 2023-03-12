require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const { salt, jwtExpiryTime } = require("../configs/auth.config");
const { userStatus, defaultProfileImage } = require("../utils/constants");

const signUp = async (req, res) => {
  //Fetch and store user data in user Object
  const userObj = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, parseInt(salt)), //TODO: CHECK THIS
    userType: req.body.userType,
    userStatus: userStatus.registered,
    //TODO : Profile image storage later
    profilePictureUrl: req.body.profilePictureUrl ?? defaultProfileImage,
    bio: req.body.bio,
  };

  try {
    const userCreated = await User.create(userObj);

    const { password, ...userWithoutPassword } = userCreated.toObject();

    console.log(
      `#### ${userWithoutPassword.userType} ${userWithoutPassword.name} created ####`
    );
    return res.status(201).send(userWithoutPassword);
  } catch (err) {
    console.log("#### Error while creating user ####", err.message);
    return res.status(500).send({
      message: "Internal server error while creating employee",
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(400).send({
        message: "#### User does not exist ####",
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "#### Wrong password ####",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userType: user.userType,
        userStatus: user.userStatus,
        purpose: "authentication", //TODO: other purpose later
      },
      authConfig.secret,
      { expiresIn: jwtExpiryTime }
    );
    console.log(`#### ${user.role} ${user.name} logged in ####`);

    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      accessToken: token,
    });
  } catch (err) {
    console.log("#### Error during user sign in ####", err.message);
    res.status(500).send({
      message: "Internal server error while employee signin",
    });
  }
};

module.exports = {
  signUp,
  login,
};
