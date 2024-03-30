const { userSchema, loginSchema } = require("../../utility/validation");
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
      const token = await UsersServices.login(valid);
      return res
        .status(200)
        .json({ status: true, message: "Login Success", token: token });
    } catch (error) {
      next(error);
    }
  };

  getUser = async (req, res, next) => {
    try {
      const results = await UsersServices.getUser();
      return res.status(200).json({ status: true, users: results });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new usersController();
