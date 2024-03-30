const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const router = Router();
router.get("/", UsersController.getUser);
router.post("/", UsersController.registration);

module.exports = router;
