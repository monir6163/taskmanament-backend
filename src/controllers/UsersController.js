const {
  userSchema,
  loginSchema,
  updateUserSchema,
  updatePasswordSchema,
} = require("../../utility/validation");
const UsersServices = require("../services/UsersServices");
const bcrypt = require("bcryptjs");

class usersController {
  registration = async (req, res, next) => {
    try {
      const valid = userSchema.parse(req.body);
      const salt = await bcrypt.genSalt(10);
      valid.password = await bcrypt.hash(valid.password, salt);
      await UsersServices.registration(valid);
      return res.status(201).json({ status: true });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const valid = loginSchema.parse(req.body);
      const user = await UsersServices.login(valid);
      return res.status(200).json({
        status: true,
        message: "Login Success",
        token: user.token,
        user: user.user,
      });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const id = req.user.id;
      req.body.id = id;
      const valid = updateUserSchema.parse(req.body);
      const results = await UsersServices.updateUser(valid);
      return res.status(200).json({ status: true, message: "User Updated" });
    } catch (error) {
      next(error);
    }
  };

  getAUser = async (req, res, next) => {
    try {
      const id = req.user.id;
      const result = await UsersServices.getAUser(id);
      return res.status(200).json({ status: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  updatePassword = async (req, res, next) => {
    try {
      const id = req.user.id;
      req.body.id = id;
      const valid = updatePasswordSchema.parse(req.body);
      const results = await UsersServices.updatePassword(valid);
      return res
        .status(200)
        .json({ status: true, message: "Password Updated" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new usersController();
