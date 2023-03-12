const User = require("../models/user.model");
const { userType } = require("../utils/constants");

const findAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length == 1 && users[0].userType == userType.admin) {
      return res.status(400).send({
        message: "No users exist except Admin.",
      });
    }

    let userResult = [];

    users.forEach((user) => {
      userResult.push({
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.userType,
        userStatus: user.userStatus,
        profilePictureURL: user.profilePictureURL,
        bio: user.bio,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    });

    res.status(200).send(userResult);
  } catch (err) {
    console.log("#### Error while fetching all user's data #### ", err.message);
    res.status(500).send({
      message: "Internal server error while fetching data",
    });
  }
};

const findUser = async (req, res) => {
  //TODO: Allow this request only for admin and the owner user
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).send({
        message: `No User found for id - ${req.params.id}`,
      });
    }

    const { password, ...userWithoutPassword } = user.toObject();

    return res.status(200).send(userWithoutPassword);
  } catch (err) {
    console.log("Error while fetching user: ", err.message);
    return res.status(500).send({
      message: "Some internal server error occurred while fetching the user",
    });
  }
};

const updateUser = async (req, res) => {
  //TODO: Allow this request only for admin and the owner user
  if (!req.params.id) {
    return res.status(404).send({
      message: "Invalid request. User id not specified in params.",
    });
  }

  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, {});

    if (!user) {
      return res.status(404).send({
        message: `No user found for id - ${req.params.id}`,
      });
    } else {
      user.name = req.body.name ?? user.name;
      user.email = req.body.email ?? user.email;
      user.profilePictureURL =
        req.body.profilePictureURL ?? user.profilePictureURL;
      user.bio = req.body.bio ?? user.bio;

      const updatedUser = await user.save();

      return res.status(200).send({
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        userType: updatedUser.userType,
        profilePictureURL: updatedUser.profilePictureURL,
        bio: updatedUser.bio,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    }
  } catch (err) {
    console.log("#### Error while updating user's data #### ", err.message);
    res.status(500).send({
      message: "Internal server error while updating user data",
    });
  }
};

const deleteUser = async (req, res) => {
  //TODO: Allow this request only for admin and the owner user

  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      return res.status(404).send({
        message: `No User found for id - ${req.params.id}`,
      });
    }

    res.status(200).send({
      message: `User ${user.name} deleted successfully.`,
    });
  } catch (err) {
    console.log("Error while deleting user: ", err.message);
    return res.status(500).send({
      message: "Some internal server error occurred while deleting the user",
    });
  }
};

module.exports = {
  findAllUsers,
  findUser,
  updateUser,
  deleteUser,
};
