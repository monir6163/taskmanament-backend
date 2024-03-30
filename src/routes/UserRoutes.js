const router = require("express").Router();
const UsersController = require("../controllers/UsersController");
router.get("/", UsersController.getUser);
router.post("/", UsersController.registration);

module.exports = router;
