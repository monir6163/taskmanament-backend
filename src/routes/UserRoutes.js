const router = require("express").Router();
const UsersController = require("../controllers/UsersController");
const authMiddleware = require("../middleware/middleware");
router.get("/", authMiddleware.auth, UsersController.getAUser);
router.post("/", UsersController.registration);
router.post("/login", UsersController.login);
router.put("/", authMiddleware.auth, UsersController.updateUser);

module.exports = router;
