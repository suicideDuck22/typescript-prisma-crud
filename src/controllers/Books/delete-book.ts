import { Request, Response } from "express";
import { InvalidIdException } from "../../error/InvalidIdException";
import { BookNotFoundException } from "../../error/Book/BookNotFoundException";

import { BookQueries } from "../../services/BookQueries";
import { BookModel } from "../../models/Book";

import { Validator } from "../../helpers/Validator";

export const deleteBookController = async (request: Request, response: Response) => {
    const parsedId: number | false = Validator.isNumberAndPositive(request.body.id);
    if(parsedId === false) throw new InvalidIdException();

    if(BookQueries.getBook(parsedId) === null) throw new BookNotFoundException(parsedId);
    const deletedBook: BookModel | void = await BookQueries.deleteBook(parsedId);

    if(deletedBook){
        response.status(200).json({ message: `The book '${deletedBook.title}' has been deleted.`, deletedBook: deletedBook});
    }
}