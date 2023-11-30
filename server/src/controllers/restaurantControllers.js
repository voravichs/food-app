const { connection } = require("../config");

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 10;

// Q1: Given categories, find names of all restaurants that meet the filters
const findRestaurantPartialInfoByCategories = (req, res) => {
  const {
    categories,
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
  } = req.query;

  if (!categories) {
    console.log("Categories query param must be non-empty.");
    res
      .status(400)
      .send({ error: "Categories must be included in the query params." });
    return;
  }

  const category_arr = categories
    .split(",")
    .map((cat) => cat.trim().toLowerCase());

  const categorySelection = category_arr.reduce((acc, cur, i) => {
    const delim = i === category_arr.length - 1 ? "" : " OR ";
    return acc + `LOWER(categories) LIKE '%${cur}%'${delim}`;
  }, "");

  connection.query(
    `SELECT name, business_id, categories, stars
    FROM Business
    WHERE ${categorySelection}
    ORDER BY stars DESC
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

// Q2: Given a business name and/or categories, return the restaurant’s name,
// location, stars, review count, opening hours
const findRestaurantByNameAndCategories = (req, res) => {
  const {
    categories,
    name,
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
  } = req.query;

  if (!categories && !name) {
    console.log("Categories or name query param must be non-empty.");
    res.status(400).send({
      error: "Categories or name must be included in the query params.",
    });
    return;
  }

  let categorySelection = "";
  if (categories) {
    const category_arr = categories
      .split(",")
      .map((cat) => cat.trim().toLowerCase());
    categorySelection = category_arr.reduce((acc, cur, i) => {
      const delim = i === category_arr.length - 1 ? "" : " OR ";
      return acc + `LOWER(B.categories) LIKE '%${cur}%'${delim}`;
    }, "");
  }

  const nameSelection = name
    ? `LOWER(B.name) LIKE '%${name.trim().toLowerCase()}%'`
    : "";

  const querySelection = [categorySelection, nameSelection]
    .filter((selection) => !!selection)
    .reduce((acc, cur, i, arr) => {
      const delim = i === arr.length - 1 ? "" : " AND ";
      return acc + `${cur}${delim}`;
    }, "");

  connection.query(
    `SELECT
      G.business_id,
      B.name,
      B.categories,
      G.postal_code,
      G.city,
      G.state,
      G.address,
      B.stars,
      B.review_count,
      B.is_open
    FROM geographical_location G JOIN Business B ON G.business_ID = B.business_id
    WHERE ${querySelection}
    ORDER BY B.stars DESC
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

// Q2: Given a businessID, return the restaurant’s name, location, stars,
// review count, opening hours
const findRestaurantById = (req, res) => {
  const { businessId } = req.params;

  if (!businessId) {
    console.log("BusinessId param must be non-empty.");
    res.status(400).send({
      error: "BusinessId must be included in the params.",
    });
    return;
  }

  connection.query(
    `SELECT
      G.business_id,
      B.name,
      B.categories,
      G.postal_code,
      G.city,
      G.state,
      G.address,
      B.stars,
      B.review_count,
      B.is_open
    FROM geographical_location G JOIN Business B ON G.business_ID = B.business_id
    WHERE B.business_id = '${businessId}'
    ORDER BY B.stars DESC;`,
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

// Q3: Number of restaurants in each city of a given state
const findRestaurantCountByCity = (req, res) => {
  const { state } = req.query;

  if (!state) {
    console.log("State query param must be non-empty.");
    res.status(400).send({
      error: "State must be included in the query params.",
    });
    return;
  }

  connection.query(
    `SELECT city, COUNT(business_id) AS restaurant_count
    FROM geographical_location
    WHERE state = '${state}'
    GROUP BY city
    ORDER BY COUNT(business_id) DESC;`,
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
  findRestaurantPartialInfoByCategories,
  findRestaurantByNameAndCategories,
  findRestaurantById,
  findRestaurantCountByCity,
};
