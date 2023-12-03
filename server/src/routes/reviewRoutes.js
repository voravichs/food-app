const express = require("express");

const { reviews } = require("../controllers");

const router = express.Router();

router.get("/:reviewId", reviews.findReviewById);

module.exports = router;
