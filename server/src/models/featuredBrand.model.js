const mongoose = require("mongoose");

const featuredBrandSchema = new mongoose.Schema({
  imgSrc: {
    type: String,
    required: [true, "FeaturedBrand imgSrc is required"],
  },
  description: {
    type: String,
    required: [true, "FeaturedBrand description is required"],
  },
  link: {
    type: String,
    required: [true, "FeaturedBrand link is required"],
  },
});

module.exports = mongoose.model("FeaturedBrand", featuredBrandSchema);
