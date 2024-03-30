const userRoute = require("../src/routes/UserRoutes");
const router = require("express").Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  // {
  //   path: "/categories",
  //   route: categoryRoutes,
  // },
  // {
  //   path: "/products",
  //   route: productRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
