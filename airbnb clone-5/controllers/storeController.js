const Home = require("../models/homeModel");
const userDetails = require("../models/userModel");
const mongoose = require("mongoose");
const path = require("path");
exports.homeController = async (req, res) => {
  const dataObj = await Home.find();
  res.render("./store/home", {
    bodyObj: dataObj,
    currentPage: "home",
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
};
exports.notFoundController = (req, res, next) => {
  res.status(404).render("./store/page404", {
    currentPage: "not found",
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
};
exports.bookingController = async (req, res) => {
  const dataObj = await Home.find();
  res.render("./store/booking", {
    bodyObj: dataObj,
    currentPage: "booking",
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
};

exports.favouriteController = async (req, res) => {
  const { favourites } = await userDetails
    .findOne({
      userEmail: req.session.user.userEmail,
    })
    .populate({ path: "favourites.favouriteId" });
  const favouriteArr = [];
  favourites.forEach((fav) => {
    fav.favouriteId ? favouriteArr.push(fav.favouriteId) : "";
  });
  favouriteArr !== ""
    ? res.render("./store/favourite", {
        bodyObj: favouriteArr,
        currentPage: "favourite",
        isLoggedIn: req.isLoggedIn,
        user: req.user,
      })
    : res.redirect("/");
};
exports.favouritePostController = async (req, res) => {
  const id = req.body.id;
  const user = await userDetails.findOne({
    userEmail: req.session.user.userEmail,
  });
  const favouritesArray = user.favourites.map((favourite) => {
    return String(favourite.favouriteId);
  });

  if (!favouritesArray.includes(id)) {
    await userDetails.findOneAndUpdate(
      { userEmail: req.session.user.userEmail },
      { $push: { favourites: { favouriteId: id } } }
    );
  }
  res.redirect("/");
};

exports.homeDetailsController = async (req, res) => {
  const HomeId = req.params.homeId;
  const bodyObj = await Home.findById(HomeId);
  res.render("./store/homeDetail", {
    currentPage: "Detail",
    bodyObj: bodyObj,
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
};
exports.reserveController = async (req, res) => {
  const dataObj = await Home.find();
  res.render("./store/reserve", {
    bodyObj: dataObj,
    currentPage: "reserve",
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
};
exports.homeListController = async (req, res) => {
  const dataObj = await Home.find();
  res.render("./store/homeList", {
    bodyObj: dataObj,
    currentPage: "home list",
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
};
exports.deleteFavouriteController = async (req, res) => {
  await userDetails.findOneAndUpdate(
    { userEmail: req.session.user.userEmail },
    {
      $pull: {
        favourites: {
          favouriteId: req.body.delFavId,
        },
      },
    }
  );

  res.redirect("/favourite");
};
exports.houseRuleController = async (req, res) => {
  const ruleHouseId = req.params.ruleHouseId;
  console.log(ruleHouseId);
  if (req.isLoggedIn === true) {
    const house = await Home.findOne({
      _id: ruleHouseId,
    });
    console.log(house);
    res.download(house.houseRules, "image.pdf");
  } else {
    res.redirect("/login");
  }
};
