import bodyParser from "body-parser";
import Express from "express";
import cors from "cors";

const app = Express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

export default app;