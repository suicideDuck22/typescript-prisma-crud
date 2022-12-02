import app from "./app";
import logger from "./lib/winston-builder.logger";

const port = process.env.PORT || 3000;

app.listen(port, () => {
    // console.log(process.env)
    logger.info(`Server is up and running at @ localhost:${port}`)
});