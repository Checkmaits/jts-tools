require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let version = require("../package.json").version;
  res.status(200).json({ message: `JT's Tools (Server) v${version} ⭐️` });
});

app.use("/api/v1/users", require("./routes/user.route"));
app.use("/api/v1/featured-categories", require("./routes/featuredCategories.route"));
app.use("/api/v1/featured-brands", require("./routes/featuredBrands.route"));
app.use("/api/v1/rates", require("./routes/rates.route"));
app.use("/api/v1/quantity-pricing", require("./routes/quantityPricing.route"));

app.use((req, res, next) => {
  let error = new Error("Endpoint not found ❌");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Internal server error ❌",
  });
});

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    let port = process.env.PORT || 1234;
    app.listen(port, () => console.log(`[JT's Tools]: Server running on port ${port}...`));
  })
  .catch((error) => console.error(error));

module.exports = { app };
