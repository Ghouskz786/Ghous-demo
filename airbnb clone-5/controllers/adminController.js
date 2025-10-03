const Home = require("../models/homeModel");
const userDetails = require("../models/userModel");
const fs = require("fs");
exports.addHomeController = (req, res) => {
  res.render("./admin/add-home", {
    currentPage: "add-home",
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
};
exports.homeAddedController = async (req, res, next) => {
  const HomeObj = new Home({
    houseName: req.body.houseName,
    houseLocation: req.body.houseLocation,
    price: req.body.housePricePerNight,
    imageUrl: req.files.houseImage[0].path,
    description: req.body.description,
    rating: req.body.houseRating,
    houseRules: req.files.houseRules[0].path,
  });
  HomeObj.save();
  res.render("./admin/post-add-home", {
    currentPage: "post added",
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
};
exports.editHomeController = async (req, res) => {
  const id = req.params.editId;
  const editData = await Home.findById(id);
  res.render("./admin/editHome", {
    currentPage: "edit-home",
    editData: editData,
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
};
exports.adminHomeListController = (req, res) => {
  res.render("./admin/adminHomeList", {
    currentPage: "admin home list",
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
};
exports.hostHomeListController = async (req, res) => {
  const dataObj = await Home.find();
  res.render("./admin/adminHomeList", {
    currentPage: "host home list",
    bodyObj: dataObj,
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
};
exports.editPostController = async (req, res) => {
  const home = await Home.findOne({ _id: req.body.id });
  if (req.files.houseImage) {
    console.log("removing houseimage");
    fs.unlink(home.imageUrl, (error) => {
      console.log(error);
    });
  }
  if (req.files.houseRules) {
    fs.unlink(home.houseRules, (error) => {
      console.log(error);
    });
  }
  const editedHome = {
    houseName: req.body.houseName,
    price: req.body.housePricePerNight,
    houseLocation: req.body.houseLocation,
    rating: req.body.houseRating,
    imageUrl: req.files.houseImage && req.files.houseImage[0].path,
    houseRules: req.files.houseRules && req.files.houseRules[0].path,
    description: req.body.description,
  };
  await Home.updateOne({ _id: req.body.id }, editedHome);
  res.redirect("/admin/host-home-list");
};
exports.deleteHomeController = async (req, res) => {
  const deleteId = req.body.id;
  const home = await Home.findOne({ _id: deleteId });
  await Home.deleteOne({ _id: deleteId });

  await userDetails.updateMany(
    {},
    { $pull: { favourites: { favouriteId: deleteId } } }
  );
  fs.unlink(home.imageUrl, (error) => {
    error && console.log(error);
  });
  fs.unlink(home.houseRules, (error) => {
    error && console.log(error);
  });
  res.redirect("/admin/host-home-list");
};
