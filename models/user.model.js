const mongoose = require("mongoose");
const {
  defaultProfileImage,
  userType,
  userStatus,
} = require("../utils/constants");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      default: userType.user,
      enum: [userType.admin, userType.user],
    },
    userStatus: {
      type: String,
      default: userStatus.unRegistered,
      enum: [userStatus.registered, userStatus.unRegistered],
    },
    lastLogin: {
      type: Date,
    },
    profilePictureURL: {
      type: String,
      default: defaultProfileImage,
    },
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
