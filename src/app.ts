import "express-async-errors";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import morganBody from "morgan-body";
import { errorMiddleware } from "./middlewares/error.middleware";
import { router } from "./routes/books";
import { loggerStream } from "./lib/morgan-body.logger";

const app = express();

morganBody(app, {
    noColors: true,
    stream: loggerStream
})

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/books', router);

app.use(errorMiddleware);

export default app;