const express = require("express");
const app = express();

const sha256 = require("./utils/sha256");

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  const { text } = req.body;
  const hash = sha256(text);

  res.send({ hash });
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("listening to port", PORT);
});
