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
    `SELECT *
    FROM review
    WHERE review_id = '${reviewId}';`,
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
