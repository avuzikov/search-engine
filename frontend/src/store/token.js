import { createSlice } from "@reduxjs/toolkit";
import token from "./token_secret";

const initialTokenState = {
  token: token,
  todosPath: "https://search-engine-c4127-default-rtdb.firebaseio.com/todos/",
  loginUrl:
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
  signUpUrl: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
  changePassUrl:
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=",
};

const tokenSlice = createSlice({
  name: "token",
  initialState: initialTokenState,
  reducers: {},
});

export const tokenActions = tokenSlice.actions;

export default tokenSlice.reducer;
