import { prismaClient } from "../database/prismaClient";

import { BookStatus } from "@prisma/client";
import { BookModel } from "../models/Book";

interface ReceivedManipulateRequest {
    bookId?: number,
    title: string,
    sinopsis: string | null,
    authorId: number,
    bookStatus?: BookStatus
}

export abstract class BookQueries {
    public static async changeBookStatus(id: number, newStatus: BookStatus):Promise<BookModel> {
        return await prismaClient.book.update({
            where: {
                id: id
            },
            data: {
                bookStatus: newStatus
            }
        })
    }

    public static async getBook(id: number): Promise<BookModel | null> {
        return await prismaClient.book.findUnique({
            where: {
                id: id
            }
        });
    }

    public static async listBooks(): Promise<BookModel[]> {
        return prismaClient.book.findMany();
    }

    public static async listBooksByStatus(status: BookStatus): Promise<BookModel[]> {
        return await prismaClient.book.findMany({
            where: {
                bookStatus: status
            }
        });
    }

    public static async addBook(newBook: ReceivedManipulateRequest): Promise<BookModel> {
        return await prismaClient.book.create({
            data: {
                title: newBook.title,
                sinopsis: newBook.sinopsis ? newBook.sinopsis : null,
                authorId: newBook.authorId
            }
        });
    }

    public static async deleteBook(id: number): Promise<BookModel | void> {
        return await prismaClient.book.delete({
            where: {
                id: id
            }
        })
    }

    public static async updateBookInfos(updateBook: ReceivedManipulateRequest) {
            return await prismaClient.book.update({
                where: {
                    id: updateBook.bookId
                },
                data: {
                    title: updateBook.title,
                    sinopsis: updateBook.sinopsis,
                    bookStatus: updateBook.bookStatus,
                    authorId: updateBook.authorId
                }
            })
    }
}