//core modules
const express = require("express");

//local modules
const {
  loginController,
  loginPostController,
  logoutController,
  signupController,
  signupPostController,
} = require("../controllers/authController");

const authRoute = express.Router();

authRoute.get("/login", loginController);
authRoute.post("/login", loginPostController);
authRoute.post("/logout", logoutController);
authRoute.get("/signup", signupController);
authRoute.post("/signup", signupPostController);
module.exports = authRoute;
