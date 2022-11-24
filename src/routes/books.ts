import { Router } from "express";
import { addBookController } from "../controllers/Books/add-book";
import { listBooksController } from "../controllers/Books/list-books";
import { viewBookController } from "../controllers/Books/view-book";

export const router = Router();

router.get('/list-books', listBooksController);
router.get('/view-book/:id', viewBookController);
router.post('/add-book', addBookController);