import { HttpException } from "../HttpException";

export class InsertBookException extends HttpException{
    constructor(status: number, message: string){
        super(status, message);
    }
}