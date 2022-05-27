const { createLogger, format, transports } = require("winston");
const { timestamp, combine, printf } = format;

const devLogger = () => {
  // custom format - not useful for production
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} - ${level}: ${stack || message}`;
  });

  return createLogger({
    level: "debug", // specifies level of logger, by default it is info
    format: combine(
      format.colorize(),
      timestamp({ format: "DD-MM-YYYY hh:mm:ss A" }),
      format.errors({ stack: true }), // to print the stack trace of error
      logFormat
    ),
    // define where you want to log
    transports: [new transports.Console()],
  });
};

module.exports = devLogger;
