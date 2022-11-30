import { HttpException } from "../HttpException";
import { HttpCode } from "../HttpCode";
import { LoggerException } from "../LoggerException";

export class BookNotFoundException extends HttpException{
    constructor(id: number){
        super(HttpCode.NOT_FOUND, `Not founded a book with ID ${id}.`);
        new LoggerException(`Not founded a book with ID.`)
    }
}