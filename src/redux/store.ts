import storage from "redux-persist/lib/storage";
import cryptoApi from "./slices/crypto-slice";
import theme from "./slices/theme-slice";
import session from "./slices/session-slice";
import authModal from "./slices/auth-modal-slice";
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
  session,
  authModal,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cryptoApi", "theme"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

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
