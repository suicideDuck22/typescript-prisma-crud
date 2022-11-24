import { HttpException } from "./HttpException";

export class BookNotFoundException extends HttpException{
    constructor(id: number){
        super(404, `Not founded a book with ID ${id}.`);
    }
}