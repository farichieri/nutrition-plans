import "@/styles/globals.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader/Loader";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {() => (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </PersistGate>
    </Provider>
  );
}
