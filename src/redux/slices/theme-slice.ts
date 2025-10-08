import { createSlice } from "@reduxjs/toolkit";

const initialState: string | null = null;

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => action.payload,
  },
});

export default themeSlice.reducer;
export const { setTheme } = themeSlice.actions;
