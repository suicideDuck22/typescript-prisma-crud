import { HttpException } from "../HttpException";
import { HttpCode } from "../HttpCode";

export class AuthorNotFoundException extends HttpException{
    constructor(id: number){
        super(HttpCode.NOT_FOUND, `Not founded an author with ID ${id}.`);
    }
}