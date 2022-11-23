import "express-async-errors";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware";

import { router } from "./routes/books";

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.use('/books', router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(errorMiddleware);

export default app;