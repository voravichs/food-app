const express = require("express");

const { businesses } = require("../controllers");

const router = express.Router();

router.get("/", businesses.findBusinessBySearchTerms);
router.get(
  "/topCitiesByBusinessCount",
  businesses.findTopCitiesByBusinessCount
);
router.get("/:businessId", businesses.getBusinessInfo);
router.get("/:businessId/reviews", businesses.findBusinessReviews);
router.get("/:businessId/relatedBusinesses", businesses.findRelatedBusinesses);

module.exports = router;
