import { orderController } from "../controllers";
import express from "express";

const router = express.Router();

router.post("/", orderController.CreateOrder);
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
