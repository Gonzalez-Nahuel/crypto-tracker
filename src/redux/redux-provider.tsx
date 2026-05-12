"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { setUser } from "./slices/session-slice";
import { Session, WatchlistType } from "@/interfaces";
import { useEffect } from "react";

export const ReduxProvider = ({
  children,
  session,
  watchlist,
}: {
  children: React.ReactNode;
  session: Session;
  watchlist: WatchlistType[];
}) => {
  useEffect(() => {
    const hasUser = store.getState().session.session;

    if (session?.status === 200 && !hasUser) {
      store.dispatch(setUser({ session: session.payload, watchlist }));
    }
  }, [watchlist, session]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
