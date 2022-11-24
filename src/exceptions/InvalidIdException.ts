import { HttpException } from "./HttpException";

export class InvalidIdException extends HttpException{
    constructor(id: string){
        super(400, `The id of book must be a number, but received: ${id}.`);
    }
}