//core modules
const path = require("path");

//external module
const express = require("express");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const multer = require("multer");
const crypto = require("crypto");

//local module
const Dir = require("./utils/pathUtils");
const { adminRouter } = require("./routes/admin");
const storeRouter = require("./routes/store");
const { notFoundController } = require("./controllers/storeController");
const authRoute = require("./routes/authRouter");
const url = "";

const port = 3000;
const app = express();
app.use(express.static(path.join(Dir, "public")));
app.set("view engine", "ejs");
// app.set("view", "views*/");
const store = new mongodbStore({
  url: "",
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype.toString() === "image/jpg" ||
      file.mimetype.toString() === "image/jpeg" ||
      file.mimetype.toString() === "image/png"
    ) {
      console.log("entered");
      cb(null, "./uploads");
    }
    if (file.mimetype.toString() === "application/pdf") {
      cb(null, "./Rules");
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      crypto.randomUUID().toString() + "." + file.mimetype.split("/")[1]
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (
    ["image/jpg", "image/jpeg", "image/png", "application/pdf"].includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  }
};
app.use(
  multer({ storage, fileFilter }).fields([
    { name: "houseImage", maxCount: 1 },
    { name: "houseRules", maxCount: 1 },
  ])
);

app.use(express.urlencoded());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  session({
    secret: "",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(async (req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn ? true : false;
  req.user = req.session.user ? req.session.user.userType : "";
  next();
});
app.use(authRoute);
app.use("/admin", adminRouter);
app.use(storeRouter);
app.use(express.static(path.join(Dir, "public")));
app.use(notFoundController);
(async () => {
  await mongoose.connect(url);
  app.listen(port, () => {
    console.log("port is listening");
  });
})();
