"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { setUser } from "./slices/session-slice";
import { Session, WatchlistType } from "@/interfaces";

export const ReduxProvider = ({
  children,
  session,
  watchlist,
}: {
  children: React.ReactNode;
  session: Session;
  watchlist: WatchlistType[];
}) => {
  const hasUser = store.getState().session.session;

  if (session?.status === 200 && !hasUser) {
    store.dispatch(setUser({ session: session.payload, watchlist }));
    console.log(watchlist);
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
