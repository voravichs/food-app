const errorHandler = (error, _req, res, _next) => {
  console.log(`Error: ${error.message}`);
  const statusCode = error.statusCode || 500;
  res.status(statusCode).send({ message: error.message });
};

module.exports = errorHandler;
