// External modules
const express = require("express");

//local modules
const {
  homeController,
  bookingController,
  favouriteController,
  reserveController,
  homeDetailsController,
  homeListController,
  favouritePostController,
  deleteFavouriteController,
  houseRuleController,
} = require("../controllers/storeController");

const storeRouter = express.Router();
storeRouter.get("/", homeController);
storeRouter.use((req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
storeRouter.get("/booking", bookingController);
storeRouter.get("/favourite", favouriteController);
storeRouter.get("/home-details/:homeId", homeDetailsController);
storeRouter.get("/reserve", reserveController);
storeRouter.get("/home-list", homeListController);
storeRouter.post("/favourite", favouritePostController);
storeRouter.post("/favourite/delete", deleteFavouriteController);
storeRouter.get("/houseRules/:ruleHouseId", houseRuleController);
module.exports = storeRouter;
