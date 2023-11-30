const express = require("express");

const { reviews } = require("../controllers");

const router = express.Router();

router.get("/user/:userId", reviews.findReviewsByUser);
router.get("/business/", reviews.findReviewsByRestaurantNameAndPostalCode);
router.get("/business/:businessId", reviews.findReviewsByRestaurant);

module.exports = router;
