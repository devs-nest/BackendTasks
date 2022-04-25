const { createLogger, format } = require("winston");
const { timestamp, combine, json } = format;

const DiscordTransport = require("winston-discord-transport").default;

const prodLogger = () => {
  return createLogger({
    level: "debug", // specifies level of logger, by default it is info
    format: combine(
      timestamp({ format: "DD-MM-YYYY hh:mm:ss A" }),
      json(),
      format.errors({ stack: true })
    ),
    transports: [
      // to log data on discord server channel
      new DiscordTransport({
        webhook: process.env.DISCORD_HOOK_URL,
        defaultMeta: { service: "discord_service" },
        level: "warn",
      }),
    ],
  });
};

module.exports = prodLogger;
