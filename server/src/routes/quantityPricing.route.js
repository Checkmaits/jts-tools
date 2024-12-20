const router = require("express").Router();
const controller = require("../controllers/quantityPricing.controller.js");

router.get("/:catalogId", controller.getQuantityPricing);

module.exports = router;
