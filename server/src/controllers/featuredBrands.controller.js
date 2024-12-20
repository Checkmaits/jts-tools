const mongoose = require("mongoose");
const FeaturedBrand = require("../models/featuredBrand.model");

async function getFeaturedBrand(req, res, next) {
  try {
    let brands = await FeaturedBrand.find({});
    res.status(200).json({
      message: `${brands.length} FeaturedBrand entries retrieved successfully ✅`,
      data: brands,
    });
  } catch (error) {
    next(new Error());
  }
}

async function createFeaturedBrand(req, res, next) {
  try {
    let featuredBrand = new FeaturedBrand(req.body);
    await featuredBrand.save();
    res.status(200).json({
      message: `FeaturedBrand created successfully (ID: ${featuredBrand.id}) ✅`,
    });
  } catch (error) {
    console.log(error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Failed to create FeaturedBrand ❌",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    next(new Error());
  }
}

async function editFeaturedBrand(req, res, next) {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    let error = new Error("Invalid FeaturedBrand ID provided ❌");
    error.status = 400;
    return next(error);
  }

  try {
    await FeaturedBrand.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      message: `FeaturedBrand updated successfully (ID: ${id}) ✅`,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Failed to edit FeaturedBrand ❌",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    next(new Error());
  }
}

async function deleteFeaturedBrand(req, res, next) {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    let error = new Error("Invalid FeaturedBrand ID provided ❌");
    error.status = 400;
    return next(error);
  }

  try {
    await FeaturedBrand.findByIdAndDelete(id);
    res.status(200).json({
      message: `FeaturedBrand deleted successfully (ID: ${id}) ✅`,
    });
  } catch (error) {
    next(new Error());
  }
}

module.exports = { getFeaturedBrand, createFeaturedBrand, editFeaturedBrand, deleteFeaturedBrand };
