const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 8080;

app.get("/image", (req, res) => {
  const imagePath = path.join(__dirname, `public/images/`);
  const files = fs.readdirSync(imagePath);

  res.json({ files });
});

app.get("/image/:name", (req, res) => {
  const name = req.params.name;
  const imagePath = path.join(__dirname, `public/images/${name}`);
  const doesImageExist = fs.existsSync(imagePath);

  if (!doesImageExist)
    return res.status(404).json({ title: "Error", message: "File not Found" });

  res.sendFile(imagePath);
});

app.get("/docs", (req, res) => {
  const docPath = path.join(__dirname, `public/docs/`);
  const files = fs.readdirSync(docPath);

  res.json({ files });
});

app.get("/docs/:name", (req, res) => {
  const name = req.params.name;
  const docPath = path.join(__dirname, `public/docs/${name}`);
  const doesDocExist = fs.existsSync(docPath);

  if (!doesDocExist)
    return res.status(404).json({ title: "Error", message: "File not Found" });

  res.sendFile(docPath);
});

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log("Listening to port", PORT);
});
