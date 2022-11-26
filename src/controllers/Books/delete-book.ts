import { Request, Response } from "express";
import { InvalidIdException } from "../../error/InvalidIdException";
import { BookQueries } from "../../services/BookQueries";
import { BookModel } from "../../models/Book";
import { Validator } from "../../helpers/validator";

export const deleteBookController = async (request: Request, response: Response) => {
    const { id } = request.body;
    const parsedId: number | false = Validator.isNumberAndPositive(id);
    if(parsedId === false) throw new InvalidIdException();

    const deletedBook: BookModel | void = await BookQueries.deleteBook(parseInt(id))

    if(deletedBook){
        response.status(200).json({ message: `The book '${deletedBook.title}' has been deleted.`, deletedBook: deletedBook});
    }
}