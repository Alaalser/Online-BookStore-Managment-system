import express from "express";
import { cartController } from "../controllers";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, cartController.getCart);
router.post("/addToCart", authMiddleware, cartController.addToCart);
router.put("/updateCart", authMiddleware, cartController.updateCart);
router.delete("/deleteFromCart", authMiddleware, cartController.removeFromCart);
router.delete("/clearCart", authMiddleware, cartController.clearCart);

export default router;
