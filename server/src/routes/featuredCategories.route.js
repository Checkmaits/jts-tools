const router = require("express").Router();
const controller = require("../controllers/featuredCategories.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", controller.getFeaturedCategories);
router.post("/create", authMiddleware, controller.createFeaturedCategories);
router.patch("/edit/:id", authMiddleware, controller.editFeaturedCategory);
router.delete("/delete/:id", authMiddleware, controller.deleteFeaturedCategory);

module.exports = router;
