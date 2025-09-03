import { configureStore } from "@reduxjs/toolkit";
import cryptoApi from "./slices/crypto-slice";

export const store = configureStore({
  reducer: {
    cryptoApi,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
