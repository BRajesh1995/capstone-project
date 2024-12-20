const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "partner"],
    require: true,
    default: "user",
  },
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
