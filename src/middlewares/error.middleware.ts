import { NextFunction, Request, Response } from "express";
import { HttpException } from "../error/HttpException";
import logger from "../lib/winston-builder.logger";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";

    logger.error(message);
    response.status(status).send(message);
}