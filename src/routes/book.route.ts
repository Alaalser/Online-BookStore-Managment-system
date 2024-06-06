import express from "express";
import { bookController } from "../controllers";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, bookController.getAllBooks);
router.get("/:id", authMiddleware, bookController.getSingleBook);
router.post("/createBook", authMiddleware, bookController.createBook);
router.put("/updateBook/:id", authMiddleware, bookController.updateBook);
router.delete("/deleteBook/:id", authMiddleware, bookController.deleteBook);

export default router;
