import app from "../../../src/app";
import request from "supertest";
import { BookModel } from "../../../src/models/Book";
import { HttpCode } from '../../../src/error/HttpCode'

describe("GET /list-books", () => {
    it("Return all books objects inside an array with correct props, and status code 200.", async () => {
        const response = await request(app)
            .get("/books/list-books")
        
        expect(response.statusCode).toEqual(HttpCode.SUCCESS);
        response.body.forEach((bookObject: BookModel) => {
            expect(bookObject).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    title: expect.any(String),
                    sinopsis: expect.toBeOneOf([expect.anything(), null]),
                    bookStatus: expect.stringMatching(/[A | UNA]VAILABLE/),
                    authorId: expect.any(Number)
                })
            )
        })
    })

    it("Return books with AVAILABLE status only, and a message if not found one.", async () => {
        const response = await request(app)
            .get("/books/list-books?status=AVAILABLE")
        
        expect(response.statusCode).toEqual(HttpCode.SUCCESS);
        if(!Array.isArray(response.body)){
            expect(response.body.message).toBe('No books founded.');
        } else {
            response.body.forEach((bookObject: BookModel) => {
                expect(bookObject).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        title: expect.any(String),
                        sinopsis: expect.toBeOneOf([expect.anything(), null]),
                        bookStatus: expect.stringContaining('AVAILABLE'),
                        authorId: expect.any(Number)
                    })
                )
            });
        }
    })

    it("Return books with UNAVAILABLE status only, and a message if not found one.", async () => {
        const response = await request(app)
            .get("/books/list-books?status=UNAVAILABLE")
        
        expect(response.statusCode).toEqual(HttpCode.SUCCESS);
        if(!Array.isArray(response.body)){
            expect(response.body.message).toBe('No books founded.');
        } else {
            response.body.forEach((bookObject: BookModel) => {
                expect(bookObject).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        title: expect.any(String),
                        sinopsis: expect.toBeOneOf([expect.anything(), null]),
                        bookStatus: expect.stringContaining('UNAVAILABLE'),
                        authorId: expect.any(Number)
                    })
                )
            });
        }
    })

    it("Return an error if the query is invalid", async () => {
        const response = await request(app)
            .get("/books/list-books?status=TESTUNAVAILABLE")
        
        expect(response.statusCode).toBe(HttpCode.BAD_REQUEST)
        expect(response.text).toBe("Invalid book status informed TESTUNAVAILABLE.")
    })
});