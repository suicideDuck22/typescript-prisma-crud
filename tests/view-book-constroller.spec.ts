import app from '../src/app';
import request from 'supertest';

describe('GET /view-book/:id', () => {
    it('Return an error if provide a param id not number.', async () => {
        const response = await request(app)
            .get('/books/view-book/teste')

        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('The id of book must be a number, but received: teste.');
    });

    it('Return error if the id of the book I wan\'t to view not exist', async () => {
        const response = await request(app)
            .get('/books/view-book/9999999');

        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('Not founded a book with ID 9999999.');
    });

    it('Return the book founded on the database with id 1 and status 200', async () => {
        const response = await request(app)
            .get('/books/view-book/1');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: 1,
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