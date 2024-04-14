const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const error = require("../middleware/error");
class userServices {
  registration = async (data) => {
    const existingUser = await prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existingUser) {
      throw error("User already exist", 409);
    }
    const result = await prisma.users.create({
      data: data,
    });
    return result;
  };

  login = async (data) => {
    const existingUser = await prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!existingUser) {
      throw error("User not found", 404);
    }
    const isMatch = await bcrypt.compare(data.password, existingUser.password);
    if (!isMatch) {
      throw error("Invalid credentials");
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
    return { token: token, user: payload };
  };

  updateUser = async (data) => {
    const existingUser = await prisma.users.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!existingUser) {
      throw error("User not found", 404);
    }
    const result = await prisma.users.update({
      where: {
        id: data.id,
      },
      data: {
        firstName: data.firstName || existingUser.firstName,
        lastName: data.lastName || existingUser.lastName,
        mobile: data.mobile || existingUser.mobile,
        photo: data.photo || existingUser.photo,
      },
    });
    return result;
  };

  getAUser = async (id) => {
    const result = await prisma.users.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        mobile: true,
        photo: true,
      },
    });
    if (!result) {
      throw error("User not found", 404);
    }
    return result;
  };

  updatePassword = async (data) => {
    const existingUser = await prisma.users.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!existingUser) {
      throw error("User not found", 404);
    }
    const isMatch = await bcrypt.compare(
      data.oldPassword,
      existingUser.password
    );
    if (!isMatch) {
      throw error("Invalid credentials");
    }
    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    const result = await prisma.users.update({
      where: {
        id: data.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return result;
  };
}

module.exports = new userServices();
