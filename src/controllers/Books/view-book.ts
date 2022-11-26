import { Request, Response } from "express";
import { InvalidIdException } from "../../error/InvalidIdException";
import { BookNotFoundException } from "../../error/Book/BookNotFoundException";
import { HttpCode } from "../../error/HttpCode";
import { BookModel } from "../../models/Book";
import { BookQueries } from "../../services/BookQueries";
import { Validator } from "../../helpers/validator";

export const viewBookController = async (request: Request, response: Response) => {
    const bookId: number | false = Validator.isNumberAndPositive(request.params.id);
    if(bookId === false) throw new InvalidIdException();

    const foundedBook: BookModel | null = await BookQueries.getBook(bookId);

    if(foundedBook === null) throw new BookNotFoundException(bookId);

    response.status(HttpCode.SUCCESS).json(foundedBook).end();
}