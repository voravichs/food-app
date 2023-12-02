const restaurants = require("./restaurantControllers");
const businesses = require("./businessControllers");
const reviews = require("./reviewControllers");
const users = require("./userControllers");

module.exports = {
  businesses,
  restaurants,
  reviews,
  users,
};
