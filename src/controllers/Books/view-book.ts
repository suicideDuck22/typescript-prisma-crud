import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { BookModel } from "../../models/BookModel";
import { InvalidIdException } from "../../exceptions/InvalidIdException";
import { BookNotFoundException } from "../../exceptions/BookNotFoundException";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const viewBookController = async (request: Request, _response: Response) => {
    if(isNaN(
        parseInt(request.params.id as string)
    )) throw new InvalidIdException(request.params.id);

    const id = parseInt(request.params.id as string);
    const foundedBooks: BookModel | null = await prismaClient.book.findUnique({
        where: {
            id: id
        }
    });

    if(foundedBooks === null){
        throw new BookNotFoundException(id);
    }
}