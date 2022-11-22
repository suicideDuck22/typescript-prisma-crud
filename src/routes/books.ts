import { Router} from "express";
import { listBooksController } from "../controllers/Books/list-books";

export const router = Router();

router.get("/list-books", listBooksController);