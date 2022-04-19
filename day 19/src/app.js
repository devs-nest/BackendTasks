import regeneratorRuntime from "regenerator-runtime";

const express = require("express");
const app = express();

import initStore from "./utils/initStore";
import render from "./utils/render";

import { matchRoutes } from "react-router-dom";
import { routes } from "./client/RoutePage";

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = initStore();
  const content = render(req, store);

  const promises = matchRoutes(routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  });

  Promise.all(promises)
    .then(() => {
      res.send(content);
    })
    .catch(() => {
      res.send("An error has occured!");
    });
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
