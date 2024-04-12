const router = require("express").Router();
const TaskController = require("../controllers/TaskController");
const authMiddleware = require("../middleware/middleware");
// router.get("/", authMiddleware.auth, TaskController.getAllTasks);
router.get("/:status", authMiddleware.auth, TaskController.getTaskByStatus);
router.get("/total/count", authMiddleware.auth, TaskController.taskCount);
router.post("/", authMiddleware.auth, TaskController.createTask);
router.put("/:id", authMiddleware.auth, TaskController.updateTask);
router.delete("/:id", authMiddleware.auth, TaskController.deleteTask);

module.exports = router;
