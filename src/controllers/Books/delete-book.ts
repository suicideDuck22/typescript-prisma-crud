import { Request, Response } from "express";
import { InvalidIdException } from "../../error/InvalidIdException";
import { BookQueries } from "../../services/BookQueries";
import { BookModel } from "../../models/Book";

export const deleteBookController = async (request: Request, response: Response) => {
    const { id } = request.body;
    if(isNaN(parseInt(id))) throw new InvalidIdException();

    const deletedBook: BookModel | void = await BookQueries.deleteBook(parseInt(id))

    if(deletedBook){
        response.status(200).json({ message: `The book '${deletedBook.title}' has been deleted.`, deletedBook: deletedBook});
    }
}