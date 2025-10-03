//external modules
const express = require("express");
const adminRouter = express.Router();

const {
  addHomeController,
  homeAddedController,
  editHomeController,
  adminHomeListController,
  hostHomeListController,
  editPostController,
  deleteHomeController,
} = require("../controllers/adminController");

// hostRouter.use(express.static(path.join(Dir, "public")));
adminRouter.use((req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
adminRouter.get("/add-home", addHomeController);

adminRouter.post("/add-home", homeAddedController);
adminRouter.get("/edit-home/:editId", editHomeController);
adminRouter.post("/edit-home", editPostController);
adminRouter.get("/admin-home-list", adminHomeListController);
adminRouter.get("/host-home-list", hostHomeListController);
adminRouter.post("/delete-home", deleteHomeController);
exports.adminRouter = adminRouter;
