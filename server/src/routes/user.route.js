const router = require("express").Router();
const controller = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/:id", authMiddleware, controller.getUser);

router.post("/login", controller.loginUser);
router.post("/create", authMiddleware, controller.createUser);

router.delete("/delete", authMiddleware, controller.deleteUser);

module.exports = router;
