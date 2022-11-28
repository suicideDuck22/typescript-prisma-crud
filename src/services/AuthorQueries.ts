import { prismaClient } from "../database/prismaClient";

import { AuthorModel } from "../models/Author";

export abstract class AuthorQueries {
    public static async getAuthor(id: number): Promise<AuthorModel | null> {
        return await prismaClient.author.findUnique({
            where: {
                id: id
            }
        })
    }
}