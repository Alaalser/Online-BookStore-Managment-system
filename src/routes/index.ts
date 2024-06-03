import express from "express";
import authRoute from "./auth.route";

const router = express.Router();

const appRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
];

appRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
