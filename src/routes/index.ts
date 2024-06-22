import express from "express";
import authRoute from "./auth.route";
import bookRoute from "./book.route";
import cartRoute from "./cart.route";
import orderRoute from "./order.route";
import addressRoute from "./address.route";

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
  {
    path: "/order",
    route: orderRoute,
  },
  {
    path: "/address",
    route: addressRoute,
  },
];

appRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
