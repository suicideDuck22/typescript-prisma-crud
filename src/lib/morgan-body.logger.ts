import { createWriteStream } from "fs";
import path from "path";

export const loggerStream = createWriteStream(
    path.join(__dirname, '../../', 'logs', 'logs.log'), { flags: 'a' }
);