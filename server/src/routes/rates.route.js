const router = require("express").Router();
const controller = require("../controllers/rates.controller");

router.get("/", controller.getShippingRates);

module.exports = router;
