const router = require("express").Router();
const UsersController = require("../controllers/UsersController");
const authMiddleware = require("../middleware/middleware");
router.get("/", authMiddleware.auth, UsersController.getUser);
router.post("/", UsersController.registration);
router.post("/login", UsersController.login);

module.exports = router;
