const { createLogger, format, transports } = require("winston");
const { timestamp, combine, json } = format;
const path = require("path");

const prodLogger = () => {
  return createLogger({
    level: "debug", // specifies level of logger, by default it is info
    format: combine(
      timestamp({ format: "DD-MM-YYYY hh:mm:ss A" }),
      json(),
      format.errors({ stack: true })
    ),
    // define where you want to log
    transports: [
      new transports.File({
        filename: path.join(__dirname, "../log/book.log"),
      }),
    ],
  });
};

module.exports = prodLogger;
