import express from "express";
import { bookController } from "../controllers";

const router = express.Router();

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getSingleBook);
router.post("/createBook", bookController.createBook);
router.put("/updateBook/:id", bookController.updateBook);
router.delete("/deleteBook/:id", bookController.deleteBook);

export default router;
