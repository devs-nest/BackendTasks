const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/index"));
app.use("/blog", require("./routes/blog"));

app.listen(PORT, () => {
  console.log("listening to port", PORT);
});
