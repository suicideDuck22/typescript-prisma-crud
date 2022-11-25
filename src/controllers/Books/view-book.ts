import { Request, Response } from "express";
import { InvalidIdException } from "../../error/InvalidIdException";
import { BookNotFoundException } from "../../error/BookNotFoundException";
import { HttpCode } from "../../error/HttpCode";
import { BookModel } from "../../models/Book";
import { BookQueries } from "../../services/BookQueries";

export const viewBookController = async (request: Request, response: Response) => {
    if(isNaN(
        parseInt(request.params.id as string)
    )) throw new InvalidIdException();

    const id = parseInt(request.params.id as string);
    const foundedBook: BookModel | null = await BookQueries.getBook(id);

    if(foundedBook === null) throw new BookNotFoundException(id);

    response.status(HttpCode.SUCCESS).json(foundedBook).end();
}