import express from "express";
import { authValidation } from "../validations";
import { authController } from "../controllers";

const router = express.Router();

router.post("/signup", authValidation, authController.signup);
router.post("/signin", authValidation, authController.signIn);
router.get("/logout", authController.logout);

export default router;
