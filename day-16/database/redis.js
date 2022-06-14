const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.connect();
client.on("connect", () => console.log("Connected to Redis!"));
client.on("error", (err) => console.log("Redis Client Error", err));

module.exports = client;
