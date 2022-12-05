import { Request, Response} from "express";

import { BookQueries } from "../../services/BookQueries";
import { BookModel } from "../../models/Book";

import { BookNotFoundException } from "../../error/Book/BookNotFoundException";
import { InvalidBookStatusException } from "../../error/Book/InvalidBookStatusException";

import { Validator } from "../../helpers/Validator";
import logger from "../../lib/winston-builder.logger";

export const changeStatusController = async (request: Request, response: Response) => {
    const { id, newStatus } = request.body;

    if(newStatus !== 'AVAILABLE' && newStatus !== 'UNAVAILABLE') throw new InvalidBookStatusException(newStatus);

    const parsedId: number | false = Validator.isNumberAndPositive(id);
    if(parsedId === false) throw new InvalidBookStatusException(id);

    const foundedBook = await BookQueries.getBook(parsedId);
    if(foundedBook === null) throw new BookNotFoundException(parsedId);

    const changedBook: BookModel = await BookQueries.changeBookStatus(parsedId, newStatus);

    if(changedBook){
        logger.info(`Book ID ${parsedId} changed status from ${foundedBook.bookStatus} to ${newStatus}`);
        response.status(200).json({ message: 'Book status changed sucessfully', bookChanged: changedBook });
    }
}