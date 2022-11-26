import { HttpException } from "../HttpException";
import { HttpCode } from "../HttpCode";

export class InvalidBookStatusException extends HttpException{
    constructor(bookStatus: string){
        super(HttpCode.BAD_REQUEST, `Invalid book status informed ${bookStatus}.`);
    }
}