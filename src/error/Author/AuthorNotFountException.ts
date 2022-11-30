import { HttpException } from "../HttpException";
import { HttpCode } from "../HttpCode";
import { LoggerException } from "../LoggerException";

export class AuthorNotFoundException extends HttpException{
    constructor(id: number){
        super(HttpCode.NOT_FOUND, `Not founded an author with ID ${id}.`);
    }
}

new LoggerException(`Not founded an author with ID.`);