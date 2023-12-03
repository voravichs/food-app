const express = require("express");

const { users } = require("../controllers");

const router = express.Router();

router.get("/:userId", users.getUserInfo);
router.get("/:userId/popularBusinesses", users.findPopularBusinesses);
router.get("/:userId/findPastVisits", users.findPastVisits);
router.get("/:userId/recommendedBusinesses", users.findRecommendedBusinesses);

module.exports = router;
