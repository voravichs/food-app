const { connection } = require("../config");

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 10;

// Q4: A user's past visits and their reviews sorted by date&time posted
const findReviewsByUser = (req, res) => {
  const { userId } = req.params;
  const { page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE } = req.query;

  if (!userId) {
    console.log("UserId param must be non-empty.");
    res.status(400).send({
      error: "UserId must be included in the params.",
    });
    return;
  }

  connection.query(
    `WITH all_visits AS (
      SELECT business_id, stars, date, text
      FROM review
      WHERE user_id = 'n-lBS02-3yvlY5Q91mmwDA'
    )
    SELECT b.name, v.stars, v.text, v.date
    FROM all_visits v JOIN Business b ON v.business_id = b.business_id
    ORDER BY v.date DESC
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

// Q7: All reviews of a restaurant sorted by usefulness(using businessID)
const findReviewsByRestaurant = (req, res) => {
  const { businessId } = req.params;
  const { page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE } = req.query;

  if (!businessId) {
    console.log("BusinessId param must be non-empty.");
    res.status(400).send({
      error: "BusinessId must be included in the params.",
    });
    return;
  }

  connection.query(
    `SELECT text, stars, user_id, date
    FROM review
    WHERE business_id = '${businessId}'
    ORDER BY useful DESC, date DESC
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

// Q7: All reviews of a restaurant sorted by usefulness(using restaurant name and postal_code)
const findReviewsByRestaurantNameAndPostalCode = (req, res) => {
  const {
    restaurantName,
    postalCode,
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
  } = req.query;

  if (!restaurantName || !postalCode) {
    console.log(
      "restaurantName and postalCode query params must be non-empty."
    );
    res.status(400).send({
      error:
        "restaurantName and postalCode must be included in the query params.",
    });
    return;
  }

  connection.query(
    `SELECT text, stars, user_id, date
    FROM review
    WHERE business_id IN (
      SELECT business_id
      FROM Business
      WHERE name = '${restaurantName}'
    )
    AND business_id IN (
      SELECT business_id
      FROM geographical_location
      WHERE postal_code = ${postalCode}
    )
    ORDER BY useful DESC, date DESC
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
  findReviewsByUser,
  findReviewsByRestaurant,
  findReviewsByRestaurantNameAndPostalCode,
};
