class usersController {
  registration = async (req, res, next) => {
    try {
      console.log(req.body);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new usersController();
