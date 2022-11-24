import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { InsertBookException } from "../../exceptions/InsertBookException";

export const addBookController = async (request: Request, response: Response) => {
    const { title, sinopsis, authorId } = request.body;
    if(isNaN(parseInt(authorId))) throw new InsertBookException(400, `Author ID must be a number, but received ${authorId}.`);
    if(!title) throw new InsertBookException(400, "Book need to have a title.");
    
    const searchAuthor = await prismaClient.author.findUnique({
        where: {
            id: parseInt(authorId)
        }
    });
    if(searchAuthor === null) throw new InsertBookException(404, `Author ID ${authorId} not exist.`);

    const newBook = await prismaClient.book.create({
        data: {
            title: title,
            sinopsis: sinopsis ? sinopsis : null,
            authorId: parseInt(authorId)
        }
    });

    return response.json({ message: `Book '${title}' added successfully to the database!`, newBook: newBook }).status(200).end();
}