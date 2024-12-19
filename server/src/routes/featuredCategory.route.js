const router = require("express").Router();
const controller = require("../controllers/featuredCategory.controller");

router.get("/", controller.getFeaturedCategories);

module.exports = router;
