import { BookStatus } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import { BookModel } from "../models/Book";

export abstract class BookQueries {
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

    public static async addBook(title: string, sinopsis: string | null, authorId: number): Promise<BookModel> {
        return await prismaClient.book.create({
            data: {
                title: title,
                sinopsis: sinopsis ? sinopsis : null,
                authorId: authorId
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
}