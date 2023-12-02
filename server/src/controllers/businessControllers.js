const { connection } = require("../config");

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 10;

// Q1: Returns a list of businesses filtered by name/category and state. Results are
// sorted by rating and number of reviews both in descending order.
const findBusinessBySearchTerms = (req, res) => {
  const {
    nameOrCategory,
    state,
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
  } = req.query;

  if (!nameOrCategory || !state) {
    const error = new Error(
      "nameOrCategory and state must be included in the query params."
    );
    error.statusCode = 400;
    throw error;
  }

  connection.query(
    `SELECT
      g.business_id,
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
    WHERE 
      (b.name LIKE '%${nameOrCategory}%' OR b.categories LIKE '%${nameOrCategory}%') 
      AND g.state = '${state}'
    ORDER BY stars DESC, review_count DESC
    LIMIT ${pageSize}
    OFFSET ${page * pageSize};`,
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

// Q2: Returns a top 10 list of cities by the number of businesses. Results are
// sorted by number of businesses in descending order.
const findTopCitiesByBusinessCount = (_req, res) => {
  connection.query(
    `WITH top_10_by_business_count AS (
        SELECT city, state, COUNT(business_id) AS business_count
        FROM geographical_location
        GROUP BY state, city
        LIMIT 10
    ),
    businesses_in_top_10_city AS (
        SELECT g.city, g.state, g.business_id
        FROM geographical_location g JOIN top_10_by_business_count t
            ON g.city = t.city AND g.state = t.state
    ),
    average_stars_per_city AS (
        SELECT b.city, b.state, AVG(r.stars) AS avg_stars
        FROM review r JOIN businesses_in_top_10_city b
            ON r.business_id = b.business_id
        GROUP BY b.city, b.state
    )
    SELECT t.city, t.state, t.business_count, a.avg_stars
    FROM top_10_by_business_count t LEFT JOIN average_stars_per_city a
        ON t.city = a.city and t.state = a.state
    ORDER BY t.business_count DESC;`,
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

// Q3: Returns all the information about the business.
const getBusinessInfo = (req, res) => {
  const { businessId } = req.params;

  if (!businessId) {
    const error = new Error("businessId must be included in the params.");
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
    FROM Business b JOIN geographical_location g
      ON b.business_id = g.business_id
    WHERE b.business_id = '${businessId}';`,
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

// Q4: Returns a list of reviews related to the businesses. Results are
// sorted by usefulness in descending order.
const findBusinessReviews = (req, res) => {
  const { businessId } = req.params;
  const { page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE } = req.query;

  if (!businessId) {
    const error = new Error("businessId must be included in the params.");
    error.statusCode = 400;
    throw error;
  }

  connection.query(
    `SELECT user_id, review_id, date, text, stars
    FROM review
    WHERE business_id = '${businessId}'
    ORDER BY useful DESC, date DESC
    LIMIT ${pageSize}
    OFFSET ${page * pageSize};`,
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

// Q5: Returns a list of 5 additional businesses related to the current business.
// Results are sorted by rating and number of reviews both in descending order.
const findRelatedBusinesses = (req, res) => {
  const { businessId } = req.params;

  if (!businessId) {
    const error = new Error("businessId must be included in the params.");
    error.statusCode = 400;
    throw error;
  }

  connection.query(
    `WITH same_reviewers AS (
      SELECT DISTINCT business_id
      FROM review
      WHERE user_id in (SELECT DISTINCT user_id
                        FROM review
                        WHERE business_id = '${businessId}')
    ),
    same_city AS (
      SELECT business_id
      FROM geographical_location
      WHERE city IN (SELECT city
                      FROM geographical_location
                      WHERE business_id = '${businessId}')
    ),
    relevant_businesses AS (
      SELECT DISTINCT r.business_id
      FROM same_reviewers r JOIN same_city c
        ON r.business_id = c.business_id
    ),
    avg_stars_per_business AS (
      SELECT r.business_id, AVG(stars) AS avg_stars, COUNT(r.review_id) AS review_count
      FROM review r JOIN relevant_businesses rb
        ON r.business_id = rb.business_id
      GROUP BY r.business_id
    ),
    count_above_avg_reviews_per_business AS (
      SELECT r.business_id, a.review_count, COUNT(r.review_id) AS above_avg_review_count
      FROM review r JOIN avg_stars_per_business a
        ON r.business_id = a.business_id
      WHERE r.stars >= a.avg_stars
      GROUP BY r.business_id
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
      c.above_avg_review_count / c.review_count AS above_avg_review_perc,
      b.is_open
    FROM relevant_businesses rb
      JOIN Business b ON rb.business_id = b.business_id
      JOIN geographical_location g ON rb.business_id = g.business_id
      JOIN count_above_avg_reviews_per_business c ON g.business_id = c.business_id
    ORDER BY b.stars DESC, b.review_count DESC
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
  findBusinessBySearchTerms,
  findTopCitiesByBusinessCount,
  getBusinessInfo,
  findBusinessReviews,
  findRelatedBusinesses,
};
