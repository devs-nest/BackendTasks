const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

// routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

// parsing data
app.use(express.json());

// routes middleware
app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("listening to port", PORT);
});
