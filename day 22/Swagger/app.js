const express = require("express");
const app = express();

const PORT = 8080 || process.env.PORT;

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = require("./swagger.json");
const swaggerDocs = swaggerJSDoc(swaggerOptions);

require("dotenv").config();
require("./database/mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", require("./routes/index"));
app.use("/song", require("./routes/song"));

// swagger middleware
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`listening to port ${PORT}`);
});
