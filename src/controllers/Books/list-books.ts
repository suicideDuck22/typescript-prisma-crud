import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

interface ReqQuery {
    booked?: number
}

export const listBooksController = async (request: Request<ReqQuery>, response: Response) => {
    try{
        if(!request.query.booked){
            const books = await prismaClient.book.findMany();
            console.log(books);
            return response.json(books).status(200).end();
        }
        console.log("Specific");
        return response.status(200).end();
    } catch(error) {
        console.log(error);
        return response.status(500).end();
    }
}