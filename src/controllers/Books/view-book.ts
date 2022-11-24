import { Request, Response } from "express";
import { InvalidIdException } from "../../exceptions/InvalidIdException";
// import { prismaClient } from "../../database/prismaClient";

export const viewBookController = (request: Request, response: Response) => {
    if(isNaN(
        parseInt(request.params.id as string)
    )){
        throw new InvalidIdException(request.params.id);
    }
}