import { Request, Response } from "express"

import { AuthorNotFoundException } from "../../error/Author/AuthorNotFountException";
import { InsertUpdateBookException } from "../../error/Book/InsertUpdateBookException";
import { InvalidBookStatusException } from "../../error/Book/InvalidBookStatusException";

import { AuthorQueries } from "../../services/AuthorQueries";
import { BookQueries } from "../../services/BookQueries";

import { HttpCode } from "../../error/HttpCode";
import { Validator } from "../../helpers/Validator";

export const updateBookController = async (request: Request, response: Response) => {
    const { title, sinopsis, bookStatus, authorId } = request.body;

    if(!title) throw new InsertUpdateBookException(HttpCode.BAD_REQUEST, 'Book need to have a title.');
    if(bookStatus != 'AVAILABLE' && bookStatus != 'UNAVAILABLE') throw new InvalidBookStatusException(request.query.status as string);
    
    const parsedAuthorID: number | false = Validator.isNumberAndPositive(authorId);
    if(parsedAuthorID === false) throw new InsertUpdateBookException(HttpCode.BAD_REQUEST, `Author ID must be a number, but received ${authorId}.`);
    
    const searchAuthor = await AuthorQueries.getAuthor(parsedAuthorID);
    if(searchAuthor === null) throw new AuthorNotFoundException(parsedAuthorID)

    const updatedBook = BookQueries.updateBookInfos({ title: title, sinopsis: sinopsis, bookStatus: bookStatus, authorId: parsedAuthorID });
    if(!updatedBook) throw new InsertUpdateBookException(HttpCode.INTERNAL_SERVER_ERROR, `An error ocurred while updating the book.`);

    response.status(HttpCode.SUCCESS).json({ message: 'Book updated successfully', updatedBook: updatedBook }).end();
}