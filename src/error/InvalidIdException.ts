import { HttpException } from "./HttpException";
import { HttpCode } from "./HttpCode";

export class InvalidIdException extends HttpException{
    constructor(){
        super(HttpCode.BAD_REQUEST, `The id of book must be a number and be positive.`);
    }
}