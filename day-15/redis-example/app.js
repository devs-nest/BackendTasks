const express = require("express");
const app = express();

const axios = require("axios");
const client = require("./database/redis");

const PORT = process.env.PORT || 8080;

app.get("/data/:search", async (req, res) => {
  const search = req.params.search;

  const data = await client.get(search);

  if (data)
    return res.send({
      title: "success",
      data: JSON.parse(data),
    });

  const recipe = await axios.get(
    `https://jsonplaceholder.typicode.com/${search}`
  );

  client.setEx(search, 10, JSON.stringify(recipe.data));

  return res.send({
    title: "success",
    data: recipe.data,
  });
});

app.listen(PORT, () => {
  console.log("listening to port", PORT);
});
