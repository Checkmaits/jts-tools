const FeaturedCategory = require("../models/featuredCategory.model");

async function getFeaturedCategories(req, res, next) {
  try {
    const categories = await FeaturedCategory.find({});
    res.status(200).json({
      message: `${categories.length} featured categories retrieved successfully`,
      data: categories,
    });
  } catch (_error) {
    console.error(_error);
    next(new Error());
  }
}

module.exports = { getFeaturedCategories };
