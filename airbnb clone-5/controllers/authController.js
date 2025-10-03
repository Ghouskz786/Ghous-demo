const { check, validationResult } = require("express-validator");
const userDetails = require("../models/userModel");
const bcrypt = require("bcryptjs");
exports.loginController = (req, res) => {
  res.render("./auth/loginPage", {
    currentPage: "login",
    isLoggedIn: false,
    errors: [],
    oldEmail: "",
    user: req.user,
  });
};
exports.loginPostController = async (req, res) => {
  const userEmail = req.body.userEmail;
  const errors = [];
  const user = await userDetails.findOne({ userEmail: userEmail });
  if (!user) {
    errors.push("user not found");
    res.status(402).render("./auth/loginPage", {
      isLoggedIn: false,
      errors,
      currentPage: "login",
      oldEmail: req.body.userEmail,
      user: [],
    });
  } else {
    if (await bcrypt.compare(req.body.password, user.password)) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/");
    } else {
      errors.push("Incorrect password");
      res.status(402).render("./auth/loginPage", {
        errors,
        isLoggedIn: false,
        currentPage: "login",
        user: [],
        oldEmail: req.body.userEmail,
      });
    }
  }
};
exports.logoutController = async (req, res) => {
  // req.session.isLoggedIn = false;
  await req.session.destroy();
  res.redirect("/");
};
exports.signupController = (req, res) => {
  res.render("./auth/signupPage", {
    currentPage: "signup",
    isLoggedIn: false,
    oldInput: [],
    errorArray: [],
    user: [],
  });
};
exports.signupPostController = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be of minimum 2 characters")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name should only contain alphabets"),
  check("lastName")
    .trim()
    .matches(/^[a-zA-z]*$/)
    .withMessage("last should only contain alphabets"),
  check("userEmail")
    .isEmail()
    .withMessage("Enter the correct email")
    .normalizeEmail(),
  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password must be of min 8 characters")
    .matches(/^[a-z]/)
    .withMessage("password should contain a lowercase")
    .matches(/[A-Z]/)
    .withMessage("password should contain an upperCase")
    .matches(/^[$@&.<>_-{}:]/)
    .withMessage("password should contain atleast one special character"),
  check("confirmPassword")
    .trim()
    .custom((value, req) => {
      if (value === req.req.body.password) {
        return true;
      } else {
        throw new Error("please enter the same password");
      }
    }),
  check("userType")
    .notEmpty()
    .withMessage("user can't be empty")
    .isIn(["guest", "host"])
    .withMessage("user can only be guest or host"),
  check("conditions").custom((value) => {
    if (value === "checked") {
      return true;
    } else {
      return new Error("cant procced without checking conditions");
    }
  }),
  async (req, res) => {
    const { firstName, lastName, userEmail, password, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const users = new userDetails({
      firstName: firstName,
      lastName: lastName,
      userEmail: userEmail,
      password: hashedPassword,
      userType: userType,
      favourites: [{}],
    });
    const errors = validationResult(req).errors;
    const errorArray = errors.map((error) => {
      return error.msg;
    });

    if (errorArray.length !== 0) {
      res.status(402).render("./auth/signupPage", {
        errorArray: errorArray,
        oldInput: { firstName, lastName, userEmail, userType },
        currentPage: "signup",
        isLoggedIn: false,
        user: [],
      });
    } else {
      try {
        await users.save();
        res.redirect("./auth/loginPage");
      } catch (error) {
        console.log(error);
        await users.save();
        res.redirect("./auth/loginPage");
      }
    }
  },
];
