import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { BookModel } from "../../models/BookModel";

export type BookStatus = 'AVAILABLE' | 'UNAVAILABLE';

const noBooksFounded = (response: Response) => {
    response.status(200).json({ message: "No books founded." }).end();
}

export const listBooksController = async (request: Request, response: Response) => {
    try{
        if(!request.query.status){
            const books: BookModel[] = await prismaClient.book.findMany();
            if(books.length === 0){
                return noBooksFounded(response);
            }
            return response.status(200).json(books).end();
        }

        const status: BookStatus = request.query.status as BookStatus;
        if(request.query.status != 'AVAILABLE' && request.query.status != 'UNAVAILABLE'){
            console.log('CAIU AQUI')
            return response.status(400).json({ error: 'An invalid parameter to search has been passed.' }).end();
        }
        
        const books: BookModel[] = await prismaClient.book.findMany({
            where: {
                bookStatus: status
            }
        });

        if(books.length !== 0){
            return response.status(200).json(books).end();
        }
        return noBooksFounded(response);
    } catch(error) {
        console.log(error);
        return response.status(500).json({ message: "An error ocurred, please contact the administrator." }).end();
    }
}