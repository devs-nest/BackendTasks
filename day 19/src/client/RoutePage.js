import React from "react";
import { useRoutes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Data from "./pages/Data";

const routes = [
  {
    path: "/",
    ...HomePage,
    exact: true,
  },
  {
    path: "/data",
    ...Data,
  },
  {
    path: "*",
    ...NotFound,
  },
];

const RoutePage = () => {
  const routeResult = useRoutes(routes);
  return routeResult;
};

export { RoutePage, routes };
