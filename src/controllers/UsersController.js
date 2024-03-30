const userSchema = require("../../utility/validation");
const UsersServices = require("../services/UsersServices");
const bcrypt = require("bcrypt");

class usersController {
  registration = async (req, res, next) => {
    try {
      const valid = userSchema.parse(req.body);
      let haspass = await bcrypt.hash(valid.password, 10);
      valid.password = haspass;
      const results = await UsersServices.registration(valid);
      return res.status(201).json({ status: true });
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