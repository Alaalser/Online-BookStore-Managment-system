import express from "express";
import { cartController } from "../controllers";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, cartController.getCart);
router.post("/addToCart", authMiddleware, cartController.addToCart);
router.delete("/deleteFromCart", authMiddleware, cartController.removeFromCart);

export default router;
