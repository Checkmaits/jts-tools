const router = require("express").Router();
const controller = require("../controllers/featuredBrands.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", controller.getFeaturedBrand);
router.post("/create", authMiddleware, controller.createFeaturedBrand);
router.patch("/edit/:id", authMiddleware, controller.editFeaturedBrand);
router.delete("/delete/:id", authMiddleware, controller.deleteFeaturedBrand);

module.exports = router;
