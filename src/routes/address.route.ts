import express from "express";
import addressController from "../controllers/address.controller";
import authMiddleware from "../middlewares/authMiddleware";
import { addressValidation } from "../validations";
const router = express.Router();

router.get("/", authMiddleware, addressController.getAddress);
router.post(
  "/addAddress",
  authMiddleware,
  addressValidation,
  addressController.addAddress
);

export default router;
