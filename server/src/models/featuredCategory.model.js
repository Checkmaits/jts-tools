const mongoose = require("mongoose");

const featuredCategorySchema = new mongoose.Schema({
  imgSrc: {
    type: String,
    required: [true, "FeaturedCategory imgSrc is required"],
  },
  description: {
    type: String,
    required: [true, "FeaturedCategory description is required"],
  },
  link: {
    type: String,
    required: [true, "FeaturedCategory link is required"],
  },
});

module.exports = mongoose.model("FeaturedCategory", featuredCategorySchema);
