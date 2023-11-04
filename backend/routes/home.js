const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");


router.route("/").get(homeController.TopArtists)
  .post(homeController.getUserToken);

router.route("/x").get(homeController.Personal).post(homeController.saveData);

router.route("/meta").get(homeController.userProfileData);

module.exports = router;
