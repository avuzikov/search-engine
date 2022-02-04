import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import tokenReducer from "./token";
import historyReducer from "./history";

const store = configureStore({
  reducer: { auth: authReducer, token: tokenReducer, history: historyReducer },
});

export default store;
