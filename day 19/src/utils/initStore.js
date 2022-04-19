import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../client/reducers";

export default () => {
  return createStore(rootReducer, {}, applyMiddleware(thunk));
};
