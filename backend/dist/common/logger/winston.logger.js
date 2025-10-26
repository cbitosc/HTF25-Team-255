"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonLogger = void 0;
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
class WinstonLogger {
    constructor() {
        const logFormat = winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.errors({ stack: true }), winston.format.splat(), winston.format.json());
        const consoleFormat = winston.format.combine(winston.format.colorize(), winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.printf(({ timestamp, level, message, context, trace }) => {
            return `${timestamp} [${context || 'Application'}] ${level}: ${message}${trace ? `\n${trace}` : ''}`;
        }));
        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: logFormat,
            transports: [
                new winston.transports.Console({
                    format: consoleFormat,
                }),
                new DailyRotateFile({
                    filename: 'logs/error-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    level: 'error',
                    maxSize: '20m',
                    maxFiles: '14d',
                }),
                new DailyRotateFile({
                    filename: 'logs/combined-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    maxSize: '20m',
                    maxFiles: '14d',
                }),
            ],
        });
    }
    log(message, context) {
        this.logger.info(message, { context });
    }
    error(message, trace, context) {
        this.logger.error(message, { context, trace });
    }
    warn(message, context) {
        this.logger.warn(message, { context });
    }
    debug(message, context) {
        this.logger.debug(message, { context });
    }
    verbose(message, context) {
        this.logger.verbose(message, { context });
    }
}
exports.WinstonLogger = WinstonLogger;
//# sourceMappingURL=winston.logger.js.map