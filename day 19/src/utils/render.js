import React from "react";
import { renderToString } from "react-dom/server";

import { Provider } from "react-redux";

import { StaticRouter } from "react-router-dom/server";
import App from "../client/App";

// to prevent from xss attacks.
import serialize from "serialize-javascript";

// for SEO. helps crawlers to look into out site
import { Helmet } from "react-helmet";

const render = (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  return `
  <!DOCTYPE html>
  <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        ${helmet.title.toString()}
        ${helmet.meta.toString()}

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    </head>
    <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="bundle.js"></script>
    </body>
  </html>
  `;
};

export default render;
