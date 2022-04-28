const express = require("express");

const app = express();

const PORT = 8080 || process.env.PORT;

require("dotenv").config();
require("./database/mongoose");

app.use(express.json());

app.use("/", require("./routes/index"));
app.use("/song", require("./routes/song"));

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`listening to port ${PORT}`);
});
