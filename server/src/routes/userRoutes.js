const express = require("express");

const { users } = require("../controllers");

const router = express.Router();

router.get("/visitedInTopCity/:userId", users.findRestaurantsInMostVisitedCity);
router.get("/mostVisited/:userId", users.findMostVisitedRestaurants);

module.exports = router;
