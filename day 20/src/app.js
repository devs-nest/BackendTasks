const express = require("express");
const app = express();

require("dotenv").config();
require("./database/mongoose");

const PORT = process.env.PORT || 8080;

app.use(express.json());

// routes middleware
app.use("/", require("./routes/index"));
app.use("/book", require("./routes/book"));

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
