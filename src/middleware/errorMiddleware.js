const errorMiddleware = (err, req, res, next) => {
  // console.log(err);
  const message = err.message ? err.message : "Server Error Occurred";
  const messagearr = err?.errors?.map((error) => error?.message);
  const status = err.status ? err.status : 500;
  res.status(status).json({
    message,
    messagearr,
  });
};

module.exports = errorMiddleware;
