const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/", require("./routes/index.js"));
app.use("/book", require("./routes/book.js"));

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
