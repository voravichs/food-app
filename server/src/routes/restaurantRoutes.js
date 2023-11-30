const express = require("express");

const { restaurants } = require("../controllers");

const router = express.Router();

router.get("/", restaurants.findRestaurantByNameAndCategories);
router.get("/partial", restaurants.findRestaurantPartialInfoByCategories);
router.get("/countByCity", restaurants.findRestaurantCountByCity);
router.get("/:businessId", restaurants.findRestaurantById);

module.exports = router;
