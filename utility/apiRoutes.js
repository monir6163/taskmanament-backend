const userRoute = require("../src/routes/UserRoutes");
const { Router } = require("express");
const router = Router();

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
