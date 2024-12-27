const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

// Registering a user

const userRegister = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      return res.send({
        success: false,
        message: "User already Exits!",
      });
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "Registration Successfull, Please login to continue",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
//user login
const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist. Please register",
      });
    }
    if (req.body.password !== user.password) {
      return res.send({
        success: false,
        message: "Sorry, invaid password entered",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("token", token);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    });
    res.send({
      success: true,
      message: "You've sucessfully logged in",
      data: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occured. Please try again later",
    });
  }
};
// get current user
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      data: user,
      message: "You are authorized to go to the protected Routes!",
    });
  } catch (error) {}
};

module.exports = { userRegister, userLogin, getCurrentUser };
