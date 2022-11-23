import { HttpException } from "./HttpException";

export class InvalidBookStatusException extends HttpException{
    constructor(bookStatus: string){
        super(400, `Invalid book status informed ${bookStatus}.`);
    }
}