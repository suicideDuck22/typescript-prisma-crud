import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export const addBookController = async (request: Request, response: Response) => {
    try {
        const { title, sinopsis, authorId } = request.body
        if(isNaN(parseInt(authorId))) return response.json({ message: "AuthorId must be a number." }).status(400).end();
        if(!title) return response.json({ message: "Book need to have a title." }).status(400).end();

        await prismaClient.book.create({
            data: {
                title: title,
                sinopsis: sinopsis,
                authorId: parseInt(authorId)
            }
        });

        return response.json({ message: "Book added successfully to the database!" }).status(200).end();
    } catch(error){
        console.error(error);
        return response.json({ message: "An error ocurred, please contact the administrator." }).status(500).end();
    }
}