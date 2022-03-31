const express = require("express");
const app = express();

// Run MongoDB and Postgres server locally beforing using these routes

// Initializing MongoDB 
require("./database/mongoose");

const PORT = process.env.PORT || 8080;

const postgresUserRoutes = require("./routes/postgresUser");
const mongoUserRoutes = require("./routes/mongoUser");

// Parsing 
app.use(express.json());

// Routes
app.use("/postgres", postgresUserRoutes);
app.use("/mongo", mongoUserRoutes);

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log("Listening to port", PORT);
});
