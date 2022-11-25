import { Router } from "express";
import { addBookController } from "../controllers/Books/add-book";
import { deleteBookController } from "../controllers/Books/delete-book";
import { listBooksController } from "../controllers/Books/list-books";
import { viewBookController } from "../controllers/Books/view-book";

export const router = Router();

router.get('/list-books', listBooksController);
router.get('/view-book/:id', viewBookController);
router.post('/add-book', addBookController);
router.delete('/delete-book', deleteBookController);