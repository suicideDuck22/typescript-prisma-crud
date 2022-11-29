import { Request, Response } from "express"

import { AuthorNotFoundException } from "../../error/Author/AuthorNotFountException";
import { InsertUpdateBookException } from "../../error/Book/InsertUpdateBookException";
import { InvalidBookStatusException } from "../../error/Book/InvalidBookStatusException";

import { AuthorQueries } from "../../services/AuthorQueries";
import { BookQueries } from "../../services/BookQueries";

import { HttpCode } from "../../error/HttpCode";
import { Validator } from "../../helpers/Validator";
import { BookNotFoundException } from "../../error/Book/BookNotFoundException";

export const updateBookController = async (request: Request, response: Response) => {
    const { bookId, title, sinopsis, bookStatus, authorId } = request.body;

    if(!title) throw new InsertUpdateBookException(HttpCode.BAD_REQUEST, 'Book need to have a title.');
    if(bookStatus != 'AVAILABLE' && bookStatus != 'UNAVAILABLE') throw new InvalidBookStatusException(request.query.status as string);
    
    const parsedAuthorID: number | false = Validator.isNumberAndPositive(authorId);
    if(parsedAuthorID === false) throw new InsertUpdateBookException(HttpCode.BAD_REQUEST, `Author ID must be a number, but received ${authorId}.`);
    const parsedBookID: number | false = Validator.isNumberAndPositive(bookId)
    if(parsedBookID === false) throw new InsertUpdateBookException(HttpCode.BAD_REQUEST, `Book ID must be a number, but received ${bookId}.`);

    const getAuthor = await AuthorQueries.getAuthor(parsedAuthorID);
    if(getAuthor === null) throw new AuthorNotFoundException(parsedAuthorID)
    const getBook = await BookQueries.getBook(parsedBookID);
    if(getBook === null) throw new BookNotFoundException(parsedBookID)

    const updatedBook = BookQueries.updateBookInfos({ bookId: parsedBookID, title: title, sinopsis: sinopsis, bookStatus: bookStatus, authorId: parsedAuthorID });
    if(!updatedBook) throw new InsertUpdateBookException(HttpCode.INTERNAL_SERVER_ERROR, `An error ocurred while updating the book.`);

    response.status(HttpCode.SUCCESS).json({ message: 'Book updated successfully', updatedBook: updatedBook }).end();
}