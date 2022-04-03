const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

require("./db/mongoose");

const indexRoutes = require("./routes/index");
const productRoutes = require("./routes/product");

app.use(express.json());

// routes
app.use("/", indexRoutes);
app.use("/product", productRoutes);

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log("listening to port", PORT);
});
