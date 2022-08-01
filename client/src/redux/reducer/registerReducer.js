import { createSlice } from "@reduxjs/toolkit";

const registerReducer = createSlice({
  name: "register",
  initialState: {
    user: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});
export const { registerStart, registerSuccess, registerFailure } =
  registerReducer.actions;
export default registerReducer.reducer;
