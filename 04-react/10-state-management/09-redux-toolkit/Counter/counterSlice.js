//This replaces the traditional combination of actions.js + counterReducer.js.

import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",

  initialState: {
    value: 0,
  },

  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Export action creators
export const {
  increment,
  decrement,
  incrementByAmount,
} = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;