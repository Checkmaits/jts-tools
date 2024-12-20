const mongoose = require("mongoose");
const FeaturedCategory = require("../models/featuredCategory.model");

async function getFeaturedCategories(req, res, next) {
  try {
    let categories = await FeaturedCategory.find({});
    res.status(200).json({
      message: `${categories.length} FeaturedCategory entries retrieved successfully ✅`,
      data: categories,
    });
  } catch (error) {
    next(new Error());
  }
}

async function createFeaturedCategories(req, res, next) {
  try {
    let stats = await FeaturedCategory.collection.stats();
    if (stats.count >= 8) {
      return res.status(400).json({
        message: "Failed to create FeaturedCategory ❌",
        errors: ["8 or more FeaturedCategory entries already exist"],
      });
    }

    let featuredCategory = new FeaturedCategory(req.body);
    await featuredCategory.save();
    res.status(200).json({
      message: `FeaturedCategory created successfully (ID: ${featuredCategory.id}) ✅`,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Failed to create FeaturedCategory ❌",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    next(new Error());
  }
}

async function editFeaturedCategory(req, res, next) {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    let error = new Error("Invalid FeaturedCategory ID provided ❌");
    error.status = 400;
    return next(error);
  }

  try {
    await FeaturedCategory.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      message: `FeaturedCategory updated successfully (ID: ${id}) ✅`,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Failed to edit FeaturedCategory ❌",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    next(new Error());
  }
}

async function deleteFeaturedCategory(req, res, next) {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    let error = new Error("Invalid FeaturedCategory ID provided ❌");
    error.status = 400;
    return next(error);
  }

  try {
    await FeaturedCategory.findByIdAndDelete(id);
    res.status(200).json({
      message: `FeaturedCategory deleted successfully (ID: ${id}) ✅`,
    });
  } catch (error) {
    next(new Error());
  }
}

module.exports = { getFeaturedCategories, createFeaturedCategories, editFeaturedCategory, deleteFeaturedCategory };
