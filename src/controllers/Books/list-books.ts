import { Request, Response } from "express"

export const listBooksController = async (request: Request, response: Response) => {
    try{
        if(!request.query.booked){
            console.log("All");
            return response.status(200).end();
        }
        console.log("Specific");
        return response.status(200).end();
    } catch(error) {
        console.log(error);
        return response.status(500).end();
    }
}