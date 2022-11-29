import app from "../../../src/app";
import request from "supertest";

interface testRequestObject {
    bookId: string,
    title: string,
    sinopsis: string,
    bookStatus: string,
    authorId: string
}

const generalRequestBody: testRequestObject = {
    bookId: '16',
    title: 'UPDATE',
    sinopsis: '',
    bookStatus: 'UNAVAILABLE',
    authorId: '1'
}

const IDBookErrorNotFound = {...generalRequestBody};
IDBookErrorNotFound.bookId = '999999';

const IDErrorNotNumber = {...generalRequestBody};
IDErrorNotNumber.bookId = '2S';

const TitleEmptyError = {...generalRequestBody};
TitleEmptyError.title = '';

const IDAuthorErrorNotFound = {...generalRequestBody};
IDAuthorErrorNotFound.authorId = '999999';

const Success = {...generalRequestBody}

describe('PUT /update-book', () => {
    it('Must be an error, because ID not exist.', async () => {
        const response = await request(app)
                            .put('/books/update-book')
                            .set('Content-type', 'application/json')
                            .send(IDBookErrorNotFound);
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('Not founded a book with ID 999999.');
    });

    it('Must be an error, because ID not contain only numbers.', async () => {
        const response = await request(app)
                            .put('/books/update-book')
                            .set('Content-type', 'application/json')
                            .send(IDErrorNotNumber);
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Book ID must be a number, but received 2S.');
    });

    it('Must be an error, because title is empty.', async () => {
        const response = await request(app)
                            .put('/books/update-book')
                            .set('Content-type', 'application/json')
                            .send(TitleEmptyError);
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Book need to have a title.');
    });

    it('Must be an error, because author not exist.', async () => {
        const response = await request(app)
                            .put('/books/update-book')
                            .set('Content-type', 'application/json')
                            .send(IDAuthorErrorNotFound);
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('Not founded an author with ID 999999.');
    });

    it('Return success.', async () => {
        const response = await request(app)
                            .put('/books/update-book')
                            .set('Content-type', 'application/json')
                            .send(Success);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Book updated successfully');
    });
});