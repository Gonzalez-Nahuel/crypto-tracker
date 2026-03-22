"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
//import { AuthBootstrap } from "@/components/auth/auth-boostrap";
import { setUser } from "./slices/auth-slice";
import { Session } from "@/interfaces";

export const ReduxProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) => {
  const hasUser = store.getState().auth.session;

  if (session?.status === 200 && !hasUser) {
    console.log("session");
    store.dispatch(setUser(session.payload));
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
