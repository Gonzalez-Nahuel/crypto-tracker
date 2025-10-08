import { configureStore } from "@reduxjs/toolkit";
import cryptoApi from "./slices/crypto-slice";
import theme from "./slices/theme-slice";

export const store = configureStore({
  reducer: {
    cryptoApi,
    theme,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
