import app from '../src/app';
import request from 'supertest';
import { HttpCode } from '../src/exceptions/HttpCode'

describe('DELETE /delete-book', () => {
    it('Must be return an error because book ID is not a number.', async () => {
        const response = await request(app)
            .delete('/books/delete-book')
            .set('Content-type', 'application/json')
            .send({
                id: 'test'
            });

        expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.text).toBe('The id of book must be a number and be positive.');
    })
})