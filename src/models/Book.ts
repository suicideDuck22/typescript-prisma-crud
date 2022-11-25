import { BookStatus } from "../controllers/Books/list-books"

export interface BookModel {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    title: string,
    sinopsis: string | null,
    bookStatus: BookStatus,
    authorId: number,
}