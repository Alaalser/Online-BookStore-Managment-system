import { orderController } from "../controllers";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, orderController.getAllOrders);
router.post("/", authMiddleware, orderController.CreateOrder);
router.get("/:id", authMiddleware, orderController.getOrderById);

export default router;
