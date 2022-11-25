import { Request, Response } from "express";
import { BookQueries } from "../../services/BookQueries";
import { BookModel } from "../../models/Book";
import { InvalidBookStatusException } from "../../error/InvalidBookStatusException";
import { HttpCode } from "../../error/HttpCode";

export type BookStatus = 'AVAILABLE' | 'UNAVAILABLE';

const noBooksFounded = (response: Response) => {
    response.status(HttpCode.SUCCESS).json({ message: "No books founded." }).end();
}

export const listBooksController = async (request: Request, response: Response) => {
    if(!request.query.status){
        const books: BookModel[] = await BookQueries.listBooks();
        if(books.length === 0){
            return noBooksFounded(response);
        }
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
    return noBooksFounded(response);
}