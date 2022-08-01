import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "user",
  initialState: {
    userCurrent: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    getStart: (state) => {
      state.isFetching = true;
    },
    getSuccess: (state, action) => {
      state.isFetching = false;
      state.userCurrent = action.payload;
    },
    getFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateStart: (state) => {
      state.isFetching = true;
    },
    updateSuccess: (state, action) => {
      state.isFetching = false;
      state.userCurrent = action.payload;
    },
    updateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getStart,
  getSuccess,
  getFailure,
  updateStart,
  updateSuccess,
  updateFailure,
} = userReducer.actions;

export default userReducer.reducer;
