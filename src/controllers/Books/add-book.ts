import { Request, Response } from "express";
import { InsertBookException } from "../../error/InsertBookException";
import { HttpCode } from "../../error/HttpCode";
import { BookQueries } from "../../services/BookQueries";
import { AuthorQueries } from "../../services/AuthorQueries";

export const addBookController = async (request: Request, response: Response) => {
    const { title, sinopsis, authorId } = request.body;
    if(isNaN(parseInt(authorId))) throw new InsertBookException(HttpCode.BAD_REQUEST, `Author ID must be a number, but received ${authorId}.`);
    if(!title) throw new InsertBookException(HttpCode.BAD_REQUEST, "Book need to have a title.");
    
    const searchAuthor = await AuthorQueries.getAuthor(parseInt(authorId));
    if(searchAuthor === null) throw new InsertBookException(HttpCode.NOT_FOUND, `Author ID ${authorId} not exist.`);

    const newBook = await BookQueries.addBook(title, sinopsis, parseInt(authorId));
    return response.status(HttpCode.SUCCESS).json({ message: `Book '${title}' added successfully to the database!`, newBook: newBook }).end();
}