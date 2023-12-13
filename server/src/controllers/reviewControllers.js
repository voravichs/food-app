const { connection } = require("../config");

// Q10: Returns all the information about the review.
const findReviewById = (req, res) => {
  const { reviewId } = req.params;

  if (!reviewId) {
    const error = new Error("reviewId must be included in the params.");
    error.statusCode = 400;
    throw error;
  }

  connection.query(
    `SELECT u.name AS reviewer, u.user_id, r.stars, r.text, r.date, r.useful, r.funny, r.cool, b.name AS business_name
    FROM review r
    JOIN user u ON u.user_id = r.user_id  
    JOIN Business b on b.business_id = r.business_id
    WHERE r.review_id = '${reviewId}';`,
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
  findReviewById,
};
