"use client";

import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { makeStore } from "@/store/store";
import AppLoader from "@/components/shared/AppLoader";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef(makeStore());
  const persistorRef = useRef(persistStore(storeRef.current));

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={<AppLoader />} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
