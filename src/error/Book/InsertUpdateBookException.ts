import { HttpException } from "../HttpException";

export class InsertUpdateBookException extends HttpException{
    constructor(status: number, message: string){
        super(status, message);
    }
}