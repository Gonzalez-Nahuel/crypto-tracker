"use client";

import storage from "redux-persist/lib/storage";
import cryptoApi from "./slices/crypto-slice";
import theme from "./slices/theme-slice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  cryptoApi,
  theme,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cryptoApi", "theme"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const clientStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(clientStore);

export type RootState = ReturnType<typeof clientStore.getState>;
export type AppDispatch = typeof clientStore.dispatch;
