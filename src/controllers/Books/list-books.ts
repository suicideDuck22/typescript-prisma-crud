import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { BookModel } from "../../models/BookModel";

export type BookStatus = 'AVAILABLE' | 'UNAVAILABLE';

const noBooksFounded = (response: Response) => {
    response.json({ message: "No books founded." }).status(200).end();
}

export const listBooksController = async (request: Request, response: Response) => {
    try{
        if(!request.query.status){
            const books: BookModel[] = await prismaClient.book.findMany();
            if(books.length === 0){
                return noBooksFounded(response);
            }
            return response.json(books).status(200).end();
        }

        const status: BookStatus = request.query.status as BookStatus;
        const books: BookModel[] = await prismaClient.book.findMany({
            where: {
                bookStatus: status
            }
        });

        if(books.length !== 0){
            return response.json(books).status(200).end();
        }
        return noBooksFounded(response);
    } catch(error) {
        console.log(error);
        return response.json({ message: "An error ocurred, please contact the administrator." }).status(500).end();
    }
}