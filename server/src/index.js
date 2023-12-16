const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const path = require("path");

const routes = require("./routes");
const { errorHandler } = require("./middleware");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/businesses", routes.businesses);
app.use("/api/reviews", routes.reviews);
app.use("/api/users", routes.users);

if (process.env.NODE_ENV === "production") {
  const __dirname1 = path.resolve();
  app.use(express.static(path.join(__dirname1, "/client/build")));
  app.get("*", (_req, res) =>
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
  );
} else {
  app.get("/", (_req, res) => {
    res.send({ message: "Welcome to Underground Foodies" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
