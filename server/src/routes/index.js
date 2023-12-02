const restaurants = require("./restaurantRoutes");
const businesses = require("./businessRoutes");
const reviews = require("./reviewRoutes");
const users = require("./userRoutes");

module.exports = {
  businesses,
  restaurants,
  reviews,
  users,
};
