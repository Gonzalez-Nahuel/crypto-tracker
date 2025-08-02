import { configureStore, createSlice } from "@reduxjs/toolkit";

const emptySlice = createSlice({
  name: "emptyy",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const store = configureStore({
  reducer: {
    empty: emptySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
