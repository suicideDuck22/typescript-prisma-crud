import app from '../src/app';
import request from 'supertest';
import { HttpCode } from '../src/exceptions/HttpCode'

describe('GET /view-book/:id', () => {
    it('Return an error if provide a param id not number.', async () => {
        const response = await request(app)
            .get('/books/view-book/teste')

        expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.text).toBe('The id of book must be a number and be positive.');
    });

    it('Return error if the id of the book I wan\'t to view not exist', async () => {
        const response = await request(app)
            .get('/books/view-book/9999999');

        expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
        expect(response.text).toBe('Not founded a book with ID 9999999.');
    });

    it('Return the book founded on the database with id 2 and status 200', async () => {
        const response = await request(app)
            .get('/books/view-book/2');
        
        expect(response.statusCode).toBe(HttpCode.SUCCESS);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: 2,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                title: expect.any(String),
                sinopsis: expect.toBeOneOf([expect.anything(), null]),
                bookStatus: expect.stringMatching(/[A | UNA]VAILABLE/),
                authorId: expect.any(Number)
            })
        )
    })
});