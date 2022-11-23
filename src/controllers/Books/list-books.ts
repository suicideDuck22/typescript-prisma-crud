import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { BookModel } from "../../models/BookModel";
// import { HttpException } from "../../exceptions/HttpException";
import { InvalidBookStatusException } from "../../exceptions/InvalidBookStatusException";

export type BookStatus = 'AVAILABLE' | 'UNAVAILABLE';

const noBooksFounded = (response: Response) => {
    response.status(200).json({ message: "No books founded." }).end();
}

export const listBooksController = async (request: Request, response: Response) => {
    // try{
        if(!request.query.status){
            const books: BookModel[] = await prismaClient.book.findMany();
            if(books.length === 0){
                return noBooksFounded(response);
            }
            return response.status(200).json(books).end();
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
            return response.status(200).json(books).end();
        }
        return noBooksFounded(response);
    // } catch(error) {
    //     return response.status(500).json({ message: "An error ocurred, please contact the administrator." }).end();
    // }
}