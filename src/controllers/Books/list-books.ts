import { Request, Response } from "express";

import { InvalidBookStatusException } from "../../error/Book/InvalidBookStatusException";

import { BookQueries } from "../../services/BookQueries";
import { BookModel } from "../../models/Book";

import { HttpCode } from "../../error/HttpCode";
import { BookStatus } from "../../models/Book";
import logger from "../../lib/winston-builder.logger";

const noBooksFounded = (response: Response) => {
    response.status(HttpCode.SUCCESS).json({ message: "No books founded." }).end();
}

export const listBooksController = async (request: Request, response: Response) => {
    if(!request.query.status){
        const books: BookModel[] = await BookQueries.listBooks();
        if(books.length === 0){
            return noBooksFounded(response);
        }

        logger.info('List with all books inside the database requested and sended.')
        return response.status(HttpCode.SUCCESS).json(books).end();
    }

    if(request.query.status != 'AVAILABLE' && request.query.status != 'UNAVAILABLE'){
        throw new InvalidBookStatusException(request.query.status as string);
    }

    const status: BookStatus = request.query.status as BookStatus;    
    const books: BookModel[] = await BookQueries.listBooksByStatus(status);

    if(books.length !== 0){
        return response.status(HttpCode.SUCCESS).json(books).end();
    }

    logger.info(`List with all books inside the database with status ${request.query.status} requested and sended.`)
    return noBooksFounded(response);
}