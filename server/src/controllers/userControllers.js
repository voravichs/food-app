const { connection } = require("../config");

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 10;

// Q5: Find a restaurant from the city that a given user has been to the most frequently
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

module.exports = {
  findRestaurantsInMostVisitedCity,
  findMostVisitedRestaurants,
};
