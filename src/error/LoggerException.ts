import { Logger } from "../lib/logger";

export class LoggerException {
    constructor(message: string){
        this.callLogger(message)
    }
    public callLogger(message: string): void {
        Logger.error(message);
    }
}