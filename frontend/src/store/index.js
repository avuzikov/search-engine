import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import tokenReducer from "./token";
import todoReducer from "./todo";

const store = configureStore({
  reducer: { auth: authReducer, token: tokenReducer, todo: todoReducer },
});

export default store;
