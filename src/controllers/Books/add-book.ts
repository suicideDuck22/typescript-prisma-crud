import { Request, Response } from "express";
import { InsertUpdateBookException } from "../../error/Book/InsertUpdateBookException";
import { HttpCode } from "../../error/HttpCode";
import { BookQueries } from "../../services/BookQueries";
import { AuthorQueries } from "../../services/AuthorQueries";
import { Validator } from "../../helpers/Validator";

export const addBookController = async (request: Request, response: Response) => {
    const { title, sinopsis, authorId } = request.body;
    const parsedAuthorID: number | false = Validator.isNumberAndPositive(authorId);
    if(parsedAuthorID === false) throw new InsertUpdateBookException(HttpCode.BAD_REQUEST, `Author ID must be a number, but received ${authorId}.`);

    if(!title) throw new InsertUpdateBookException(HttpCode.BAD_REQUEST, "Book need to have a title.");
    
    const searchAuthor = await AuthorQueries.getAuthor(parsedAuthorID);
    if(searchAuthor === null) throw new InsertUpdateBookException(HttpCode.NOT_FOUND, `Author ID ${authorId} not exist.`);

    const newBook = await BookQueries.addBook(title, sinopsis, parsedAuthorID);
    return response.status(HttpCode.SUCCESS).json({ message: `Book '${title}' added successfully to the database!`, newBook: newBook }).end();
}