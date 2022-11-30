import "express-async-errors";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware";
import { morganMiddleware } from './config/morgan.middleware';

import { router } from "./routes/books";

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(morganMiddleware);

app.use('/books', router);

app.use(errorMiddleware);

export default app;