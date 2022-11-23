import { Router } from "express";
import { addBookController } from "../controllers/Books/add-book";
import { listBooksController } from "../controllers/Books/list-books";

export const router = Router();

router.get('/list-books', listBooksController);
router.post('/add-book', addBookController);