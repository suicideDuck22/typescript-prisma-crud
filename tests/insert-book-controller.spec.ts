import app from '../src/app';
import request from 'supertest';
import { prismaClient } from '../src/database/prismaClient';
import { HttpCode } from '../src/error/HttpCode'

describe('POST /add-book', () => {
    it('Must be return an error because author ID is not a number.', async () => {
        const response = await request(app)
            .post('/books/add-book')
            .set('Content-type', 'application/json')
            .send({
                title: 'Will return error',
                sinopsis: null,
                authorId: 'test'
            });

        expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.text).toBe('Author ID must be a number, but received test.');
    })

    it('Must be return an error because title is empty, but can\'t.', async () => {        
        const response = await request(app)
            .post('/books/add-book')
            .set('Content-type', 'application/json')
            .send({
                title: '',
                sinopsis: 'Will return an error.',
                authorId: '1'
            });

        expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.text).toBe('Book need to have a title.');
    })

    it('Must be return an error because authorId not exist on database.', async () => {        
        const response = await request(app)
            .post('/books/add-book')
            .set('Content-type', 'application/json')
            .send({
                title: 'Title error',
                sinopsis: 'Will return an error.',
                authorId: '99999'
            });

        expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
        expect(response.text).toBe('Author ID 99999 not exist.');
    })

    it('It will return success, with status 200.', async () => {        
        const response = await request(app)
            .post('/books/add-book')
            .set('Content-type', 'application/json')
            .send({
                title: 'Title success',
                sinopsis: '',
                authorId: '1'
            });

        expect(response.statusCode).toBe(HttpCode.SUCCESS);
        expect(response.body.message).toBe("Book 'Title success' added successfully to the database!");
        expect(response.body.newBook).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                title: expect.any(String),
                sinopsis: expect.toBeOneOf([expect.anything(), null]),
                bookStatus: expect.stringMatching('AVAILABLE'),
                authorId: expect.any(Number)
            })
        )

        async function deleteRegTest() {
            await prismaClient.book.deleteMany({
                where: {
                    title: 'Title success'
                }
            })
        }
        deleteRegTest()
            .then(async () => { await prismaClient.$disconnect() })
            .catch(async (error) => {
                console.error(error);
                await prismaClient.$disconnect();
                process.exit(1);
            })
    })
})