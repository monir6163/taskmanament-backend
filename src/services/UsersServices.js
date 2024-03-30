const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class userServices {
  registration = async (data) => {
    return prisma.users.create({
      data: data,
    });
  };

  login = async (data) => {
    const existingUser = await prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!existingUser) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(data.password, existingUser.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const payload = {
      id: existingUser.id,
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      photo: existingUser.photo,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
      issuer: process.env.JWT_ISSUER,
    });
    return token;
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
