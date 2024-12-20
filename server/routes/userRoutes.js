const express = require("express");
const { userRegister, userLogin } = require("../controllers/useController");
const userRouter = express.Router();

//register
userRouter.post("/register", userRegister);

//login
userRouter.post("/login", userLogin);

module.exports = userRouter;
