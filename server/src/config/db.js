const dotenv = require("dotenv");
const mysql = require("mysql");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const connection = mysql.createConnection({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DB,
});

connection.connect((err) => err && console.log(err));

module.exports = connection;
