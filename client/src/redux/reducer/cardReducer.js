import { createSlice } from "@reduxjs/toolkit";

const cardReducer = createSlice({
  name: "card",
  initialState: {
    currentCards: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    createCardStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createCardSuccess: (state, action) => {
      state.isFetching = false;
      state.currentCards.push(action.payload);
      state.error = false;
    },
    createCardFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getCardStart: (state) => {
      state.isFetching = true;
    },
    getCardSuccess: (state, action) => {
      state.isFetching = false;
      state.currentCards = action.payload;
    },
    getCardFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteCardStart: (state) => {
      state.isFetching = true;
    },
    deleteCardSuccess: (state, action) => {
      state.isFetching = false;
      const currentCards = state.currentCards.filter(
        (currentCard) => currentCard._id !== action.payload
      );
      state.currentCards = currentCards;
    },
    deleteCardFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateCardStart: (state) => {
      state.isFetching = true;
    },
    updateCardSuccess: (state, action) => {
      state.isFetching = false;
      const cards = state.currentCards.findIndex(
        (currentCard) => currentCard._id === action.payload._id
      );
      state.currentCards[cards] = action.payload;
    },
    updateCardFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});
export const {
  createCardStart,
  createCardSuccess,
  createCardFailure,
  getCardStart,
  getCardSuccess,
  getCardFailure,
  deleteCardStart,
  deleteCardSuccess,
  deleteCardFailure,
  updateCardStart,
  updateCardSuccess,
  updateCardFailure,
} = cardReducer.actions;

export default cardReducer.reducer;
