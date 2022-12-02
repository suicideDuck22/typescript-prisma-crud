import path from "path";
import { format, createLogger, transports } from "winston";
const { timestamp, combine, errors, json} = format;

export const buildProdLogger = () => { 
    return createLogger({
        format: combine(
            timestamp(),
            errors({ stack: true }),
            json(),
        ),
        defaultMeta: { service: 'user-service' },
        transports: [
            new transports.File({
                filename: path.join(__dirname, '../../logs', 'proccess.log')
            })
        ]
    })
}