const express = require("express");
const {
  userRegister,
  userLogin,
  getCurrentUser,
} = require("../controllers/useController");
const auth = require("../middlewares/authMiddleware");
const userRouter = express.Router();

//register
userRouter.post("/register", userRegister);

//login
userRouter.post("/login", userLogin);

userRouter.get("/get-current-user", auth, getCurrentUser);

module.exports = userRouter;
