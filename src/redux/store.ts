import { configureStore } from "@reduxjs/toolkit";
import cryptoApi from "./slices/crypto-slice";
import theme from "./slices/theme-slice";
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
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  cryptoApi,
  theme,
});

const persisConfig = {
  key: "root",
  storage,
  whitelist: ["cryptoApi", "theme"],
};

const persistedReducer = persistReducer(persisConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
