const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use("/", require("./routes/index"));
app.use("/artist", require("./routes/artist"));
app.use("/search", require("./routes/search"));

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Listening to port ${PORT}`);
});
