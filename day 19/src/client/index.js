import regeneratorRuntime from "regenerator-runtime";

import React from "react";
import { hydrateRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import App from "./App";

// redux
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import rootReducer from "./reducers/index";

const store = createStore(
  rootReducer,
  window.INITIAL_STATE,
  applyMiddleware(thunk)
);
const container = document.getElementById("root");

// hydration means combining the functionality back to the rendered html

hydrateRoot(
  container,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
