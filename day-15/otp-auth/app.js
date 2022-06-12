const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

// parsing
app.use(express.json());

// routes middleware
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));

app.listen(PORT, () => {
  console.log("listening to port", PORT);
});
