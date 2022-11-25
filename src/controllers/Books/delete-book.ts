import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { BookNotFoundException } from "../../exceptions/BookNotFoundException";
import { InvalidIdException } from "../../exceptions/InvalidIdException";

export const deleteBookController = async (request: Request, response: Response) => {
    const { id } = request.body;
    if(isNaN(parseInt(id))) throw new InvalidIdException();

    const bookToDelete = await prismaClient.book.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if(bookToDelete === null) throw new BookNotFoundException(id);

    const deletedBook = await prismaClient.book.delete({
        where: {
            id: parseInt(id)
        }
    })

    response.status(200).json({ message: `The book '${deletedBook.title}' has been deleted.`, deletedBook: deletedBook});
}