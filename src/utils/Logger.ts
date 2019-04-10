import chalk from "chalk";
import moment from "moment";
import {
    Logger as WinstonLogger,
    createLogger,
    format,
    transports
} from "winston";

export default class Logger {
    private _log: WinstonLogger;

    public constructor() {
        this._log = createLogger({
            level: "info",
            format: format.combine(
                format.timestamp(),
                format.printf((log) => `${moment(log.timestamp).format("DD/MM/YYYY, hh:mm:ss")} ${chalk.black.bgGreen(`[${log.label}]`)} ${this._getColored(log.level)}: ${log.message}`)
            ),
            transports: [new transports.Console()]
        });
    }

    public ready(message: string) {
        this._log.info(message, { label: "READY" });
    }

    public info(label: string, message: string) {
        this._log.info(message, { label });
    }

    public warn(label: string, message: string) {
        this._log.warn(message, { label });
    }

    public error(label: string, error: any) {
        this._log.error(error.stack ? error.stack : error.toString(), { label });
    }

    private _getColored(logLevel: string) {
        if (logLevel === "error") {
            return chalk.red.bold(logLevel);
        } else if (logLevel === "warn") {
            return chalk.yellow.bold(logLevel);
        } else if (logLevel === "info") {
            return chalk.blue.bold(logLevel);
        }

        return chalk.white(logLevel);
    }
}