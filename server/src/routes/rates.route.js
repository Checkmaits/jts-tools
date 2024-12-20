const router = require("express").Router();
const controller = require("../controllers/rates.controller");

router.post("/", controller.getRates);

module.exports = router;
