const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class userServices {
  registration = async (data) => {
    return prisma.users.create({
      data: data,
    });
  };

  getUser = async () => {
    return prisma.users.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        mobile: true,
        photo: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  };
}

module.exports = new userServices();
