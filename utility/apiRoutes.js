const userRoute = require("../src/routes/UserRoutes");
const taskRoute = require("../src/routes/TaskRoutes");
const router = require("express").Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/task",
    route: taskRoute,
  },
  // {
  //   path: "/products",
  //   route: productRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
