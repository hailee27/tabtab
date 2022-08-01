import { createSlice } from "@reduxjs/toolkit";

const loginReducer = createSlice({
  name: "login",
  initialState: {
    user: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logOut: (state) => {
      state.user = undefined;
      state.error = false;
      state.isFetching = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logOut } =
  loginReducer.actions;

export default loginReducer.reducer;
