import app from "./app";
import { Logger } from "./lib/logger";

const port = process.env.PORT || 3000;

app.listen(port, () => {
    Logger.debug(`Server running and is up at @ localhost:${port}`);
});