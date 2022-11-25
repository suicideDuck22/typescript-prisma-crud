import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { BookModel } from "../../models/BookModel";
import { InvalidBookStatusException } from "../../exceptions/InvalidBookStatusException";
import { HttpCode } from "../../exceptions/HttpCode";

export type BookStatus = 'AVAILABLE' | 'UNAVAILABLE';

const noBooksFounded = (response: Response) => {
    response.status(HttpCode.SUCCESS).json({ message: "No books founded." }).end();
}

export const listBooksController = async (request: Request, response: Response) => {
    if(!request.query.status){
        const books: BookModel[] = await prismaClient.book.findMany();
        if(books.length === 0){
            return noBooksFounded(response);
        }
        return response.status(HttpCode.SUCCESS).json(books).end();
    }

    if(request.query.status != 'AVAILABLE' && request.query.status != 'UNAVAILABLE'){
        throw new InvalidBookStatusException(request.query.status as string);
    }

    const status: BookStatus = request.query.status as BookStatus;    
    const books: BookModel[] = await prismaClient.book.findMany({
        where: {
            bookStatus: status
        }
    });

    if(books.length !== 0){
        return response.status(HttpCode.SUCCESS).json(books).end();
    }
    return noBooksFounded(response);
}