const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

const streamRoute = require("./routes/stream");

app.use("/stream", streamRoute);

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log("Listening to port", PORT);
});
