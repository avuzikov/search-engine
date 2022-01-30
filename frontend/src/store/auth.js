import { createSlice } from "@reduxjs/toolkit";

const initialAuthentificationState = {
  loggedIn: false,
  displayName: "",
  email: "",
  expiresIn: "",
  idToken: "",
  kind: "",
  localId: "",
  refreshToken: "",
  registered: false,
  expirationTime: "",
};

const authSlice = createSlice({
  name: "authentification",
  initialState: initialAuthentificationState,
  reducers: {
    login(state, action) {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.expiresIn = action.payload.expiresIn;
      state.idToken = action.payload.idToken;
      state.kind = action.payload.kind;
      state.localId = action.payload.localId;
      state.refreshToken = action.payload.refreshToken;
      state.registered = action.payload.registered;
      state.expirationTime = action.payload.expirationTime;
      state.loggedIn = true;
      localStorage.setItem("tokenInfo", JSON.stringify(action.payload));
    },

    logout(state, action) {
      state.displayName = "";
      state.email = "";
      state.expiresIn = "";
      state.idToken = "";
      state.kind = "";
      state.localId = "";
      state.refreshToken = "";
      state.registered = false;
      state.loggedIn = false;
      state.expirationTime = "";
      localStorage.removeItem("tokenInfo");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

//response for login:
//idToken	string	A Firebase Auth ID token for the authenticated user.
//email	string	The email for the authenticated user.
//refreshToken	string	A Firebase Auth refresh token for the authenticated user.
//expiresIn	string	The number of seconds in which the ID token expires.
//localId	string	The uid of the authenticated user.
//registered	boolean	Whether the email is for an existing account.
