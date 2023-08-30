import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  points: 1,
};

const incrementByAmount = createAction("account/incrementByAmount");

export const bonusSlice = createSlice({
  name: "bonus",
  initialState,
  reducers: {
    increment: (state) => {
      state.points += 1; // immer library
    },
  },
  extraReducers: (builder) => {
    builder.addCase(incrementByAmount, (state, action) => {
      if (action.payload >= 100) {
        state.points++;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const { increment } = bonusSlice.actions;

export default bonusSlice.reducer;
