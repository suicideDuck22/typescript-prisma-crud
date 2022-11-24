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
});