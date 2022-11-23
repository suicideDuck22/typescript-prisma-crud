import app from "../src/app";
import request from "supertest";
import { BookModel } from "../src/models/BookModel";

describe("GET /list-books", () => {
    it("Return all books objects inside an array with correct props and status code 200.", async () => {
        const response = await request(app)
            .get("/books/list-books")
        
        expect(response.statusCode).toEqual(200);
        response.body.forEach((bookObject: BookModel) => {
            expect(bookObject).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    title: expect.any(String),
                    sinopsis: expect.toBeOneOf([expect.anything(), null]),
                    bookStatus: expect.stringMatching(/[A | UN]VAILABLE/),
                    authorId: expect.any(Number)
                })
            )
        })
    });
});