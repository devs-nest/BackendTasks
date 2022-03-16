const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 8080;

app.get("/image", (req, res) => {
  res.json({
    files: ["art.jpg", "japan.png", "tree.png"],
  });
});

app.get("/image/:name", async (req, res) => {
  const name = req.params.name;
  const imagePath = path.join(__dirname, `public/images/${name}`);
  const doesImageExist = await fs.existsSync(imagePath);

  if (!doesImageExist)
    return res.status(404).json({ title: "Error", message: "File not Found" });

  res.sendFile(imagePath);
});

app.get("/docs", (req, res) => {
  res.json({
    files: ["resume-template.pdf", "stock.csv"],
  });
});

app.get("/docs/:name", async (req, res) => {
  const name = req.params.name;
  const docPath = path.join(__dirname, `public/docs/${name}`);
  const doesDocExist = await fs.existsSync(docPath);

  if (!doesDocExist)
    return res.status(404).json({ title: "Error", message: "File not Found" });

  res.sendFile(docPath);
});

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log("Listening to port", PORT);
});
