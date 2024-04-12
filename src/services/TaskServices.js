const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class taskServices {
  getTaskByStatus = async (userId, status) => {
    const result = await prisma.tasks.findMany({
      where: {
        userId: userId,
        status: status,
      },
      orderBy: { createdAt: "desc" },
    });
    return result;
  };

  taskCount = async (userId) => {
    const result = await prisma.tasks.groupBy({
      by: ["status"],
      where: {
        userId: userId,
      },
      _count: {
        status: true,
      },
    });

    const statusCounts = {
      new: 0,
      progress: 0,
      canceled: 0,
      completed: 0,
    };
    result.forEach((entry) => {
      switch (entry.status) {
        case "new":
          statusCounts.new = entry._count.status;
          break;
        case "progress":
          statusCounts.progress = entry._count.status;
          break;
        case "canceled":
          statusCounts.canceled = entry._count.status;
          break;
        case "completed":
          statusCounts.completed = entry._count.status;
          break;
        default:
          break;
      }
    });

    return statusCounts;
  };

  createTask = async (data) => {
    const result = await prisma.tasks.create({ data: data });
    return result;
  };
  updateTask = async (taskId, userId, data) => {
    const result = await prisma.tasks.update({
      where: {
        id: taskId,
        userId: userId,
      },
      data: data,
    });
    return result;
  };

  deleteTask = async (taskId, userId) => {
    const result = await prisma.tasks.delete({
      where: {
        id: taskId,
        userId: userId,
      },
    });
    return result;
  };
}

module.exports = new taskServices();
