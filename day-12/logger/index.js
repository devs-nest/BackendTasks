const devLogger = require("./devLogger"); // for development environment
const prodLogger = require("./prodLogger"); // for production

/* 
    Levels for winston logger
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
*/

let logger = null;

if (process.env.NODE_ENV === "development") {
  logger = devLogger();
} else {
  logger = prodLogger();
}

module.exports = logger;
