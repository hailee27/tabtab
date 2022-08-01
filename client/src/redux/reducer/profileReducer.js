import { createSlice } from "@reduxjs/toolkit";

const profileReducer = createSlice({
  name: "profile",
  initialState: {
    profileCurrent: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    getProfileStart: (state) => {
      state.isFetching = true;
    },
    getProfileSuccess: (state, action) => {
      state.isFetching = false;
      state.profileCurrent = action.payload;
    },
    getProfileFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getProfileSuccess, getProfileStart, getProfileFailure } =
  profileReducer.actions;

export default profileReducer.reducer;
