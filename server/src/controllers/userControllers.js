const { connection } = require("../config");

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 10;

// Q5: Find a restaurant from the city that a given user has been to the most frequently
/** @deprecated */
const findRestaurantsInMostVisitedCity = (req, res) => {
  const { userId } = req.params;
  const { page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE } = req.query;

  if (!userId) {
    console.log("userId query param must be non-empty.");
    res.status(400).send({
      error: "userId must be included in the query params.",
    });
    return;
  }

  connection.query(
    `WITH users_visits_most AS (
      SELECT g.state, g.city
      FROM review r JOIN geographical_location g 
        ON r.business_id = g.business_id
      WHERE r.user_id = '${userId}'
      GROUP BY g.state, g.city
      ORDER BY COUNT(*)
      LIMIT 1
    )
    SELECT b.name, b.business_id, b.stars
    FROM Business b JOIN geographical_location g ON b.business_id = g.business_id
    WHERE g.city IN (SELECT city FROM users_visits_most)
    ORDER BY b.stars DESC
    LIMIT ${pageSize}
    OFFSET ${page * pageSize};`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.send([]);
      } else {
        res.send(data);
      }
    }
  );
};

// Q6: Find most visited restaurant that the given user has been to
/** @deprecated */
const findMostVisitedRestaurants = (req, res) => {
  const { userId } = req.params;
  const { page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE } = req.query;

  if (!userId) {
    console.log("userId query param must be non-empty.");
    res.status(400).send({
      error: "userId must be included in the query params.",
    });
    return;
  }

  connection.query(
    `SELECT b.business_id, b.name, b.stars, b.review_count
    FROM Business b JOIN review r ON b.business_id = r.business_id
    WHERE r.user_id = '${userId}'
    ORDER BY b.review_count DESC
    LIMIT ${pageSize}
    OFFSET ${page * pageSize};`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.send([]);
      } else {
        res.send(data);
      }
    }
  );
};

// Q6: Returns all the information about the user.
const getUserInfo = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    const error = new Error("userId must be included in the params.");
    error.statusCode = 400;
    throw error;
  }

  connection.query(
    `SELECT *
    FROM user
    WHERE user_id = '${userId}';`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(`Error: ${err}`);
        res.send([]);
      } else {
        res.send(data);
      }
    }
  );
};

// Q7: Returns a list of the 5 most popular restaurants out of all the restaurants the user
// has visited. Results are sorted by rating and number of reviews both in descending order.
const findPopularBusinesses = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    const error = new Error("userId must be included in the params.");
    error.statusCode = 400;
    throw error;
  }

  connection.query(
    `SELECT
      b.business_id,
      b.name,
      b.categories,
      g.postal_code,
      g.city,
      g.state,
      g.address,
      b.stars,
      b.review_count,
      b.is_open
    FROM Business b 
      JOIN review r ON b.business_id = r.business_id
      JOIN geographical_location g ON b.business_id = g.business_id
    WHERE r.user_id = '${userId}'
    ORDER BY b.review_count DESC
    LIMIT 5;`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(`Error: ${err}`);
        res.send([]);
      } else {
        res.send(data);
      }
    }
  );
};

// Q8: Returns a list of businesses the user has left reviews. Results are
// sorted by the date and time of review creation in descending order.
// TODO: implement function

// Q9: Returns a list of 5 additional businesses from the city the user has been to
// the most frequently. Results are sorted by rating and number of reviews both in
// descending order.
const findRecommendedBusinesses = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    const error = new Error("userId must be included in the params.");
    error.statusCode = 400;
    throw error;
  }

  connection.query(
    `WITH users_visits_most AS (
      SELECT g.state, g.city
      FROM review r JOIN geographical_location g
        ON r.business_id = g.business_id
      WHERE r.user_id = '${userId}'
      GROUP BY g.state, g.city
      ORDER BY COUNT(*)
      LIMIT 1
    )
    SELECT
      b.business_id,
      b.name,
      b.categories,
      g.postal_code,
      g.city,
      g.state,
      g.address,
      b.stars,
      b.review_count,
      b.is_open
    FROM Business b JOIN geographical_location g
      ON b.business_id = g.business_id
    WHERE g.city IN (SELECT city FROM users_visits_most)
    ORDER BY b.stars DESC
    LIMIT 5;`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(`Error: ${err}`);
        res.send([]);
      } else {
        res.send(data);
      }
    }
  );
};

module.exports = {
  findRestaurantsInMostVisitedCity,
  findMostVisitedRestaurants,
  getUserInfo,
  findPopularBusinesses,
  findRecommendedBusinesses,
};
