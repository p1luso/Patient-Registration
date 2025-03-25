const winston = require('winston');
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logFilePath = path.join(logDir, 'server.log');
if (fs.existsSync(logFilePath)) {
    fs.truncateSync(logFilePath, 0);
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: logFilePath })
    ],
});

module.exports = logger;
