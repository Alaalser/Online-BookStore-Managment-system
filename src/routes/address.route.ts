import express from "express";
import addressController from "../controllers/address.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, addressController.getAddress);
router.post("/addAddress", authMiddleware, addressController.addAddress);

export default router;
