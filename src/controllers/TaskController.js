const { taskSchema } = require("../../utility/validation");
const TaskServices = require("../services/TaskServices");

class taskController {
  getTaskByStatus = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const status = req.params.status;
      const result = await TaskServices.getTaskByStatus(userId, status);
      res.status(200).json({ status: true, result });
    } catch (error) {
      next(error);
    }
  };

  taskCount = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const result = await TaskServices.taskCount(userId);
      res.status(200).json({ status: true, result });
    } catch (error) {
      next(error);
    }
  };

  createTask = async (req, res, next) => {
    try {
      const userId = req.user.id;
      req.body.userId = userId;
      const valid = taskSchema.parse(req.body);
      const result = await TaskServices.createTask(valid);
      res
        .status(201)
        .json({ status: true, message: "Task created successfully" });
    } catch (error) {
      next(error);
    }
  };

  updateTask = async (req, res, next) => {
    try {
      const taskId = parseInt(req.params.id);
      const userId = parseInt(req.user.id);
      const data = req.body;
      const result = await TaskServices.updateTask(taskId, userId, data);
      res
        .status(200)
        .json({ status: true, message: "Task updated successfully", result });
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req, res, next) => {
    try {
      const taskId = parseInt(req.params.id);
      const userId = parseInt(req.user.id);
      const result = await TaskServices.deleteTask(taskId, userId);
      res
        .status(200)
        .json({ status: true, message: "Task deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new taskController();
