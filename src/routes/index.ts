import express from "express";
import authRoute from "./auth.route";
import bookRoute from "./book.route";
import cartRoute from "./cart.route";
const router = express.Router();

const appRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/books",
    route: bookRoute,
  },
  {
    path: "/cart",
    route: cartRoute,
  },
];

appRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
