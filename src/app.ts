import bodyParser from "body-parser";
import Express from "express";
import cors from "cors";

import { router } from "./routes/books";

const app: Express.Application = Express();

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors());

app.use('/books', router);

export default app;