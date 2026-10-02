import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    name: "Guest",
  },

  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
  },
});

// Export action creator
export const { updateName } = userSlice.actions;

// Export reducer
export default userSlice.reducer;