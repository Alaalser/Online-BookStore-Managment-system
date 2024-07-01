import express from "express";
import { bookController } from "../controllers";
import authMiddleware from "../middlewares/authMiddleware";
import { bookValidation } from "../validations";

const router = express.Router();

router.get("/", authMiddleware, bookController.getAllBooks);
router.get("/search", authMiddleware, bookController.searchBooks);
router.get("/filter", authMiddleware, bookController.filterBooks);
router.get("/:id", authMiddleware, bookController.getSingleBook);
router.post(
  "/createBook",
  authMiddleware,
  bookValidation,
  bookController.createBook
);
router.put(
  "/updateBook/:id",
  authMiddleware,
  bookValidation,
  bookController.updateBook
);
router.delete("/deleteBook/:id", authMiddleware, bookController.deleteBook);

export default router;
