import { HttpException } from "../HttpException";
import { HttpCode } from "../HttpCode";

export class BookNotFoundException extends HttpException{
    constructor(id: number){
        super(HttpCode.NOT_FOUND, `Not founded a book with ID ${id}.`);
    }
}