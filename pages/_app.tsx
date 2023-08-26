import "nprogress/nprogress.css";
import "@/styles/globals.css";
import { auth } from "@/services/firebase";
import { getAnalytics, logEvent, setUserId } from "firebase/analytics";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { Layout } from "@/layouts";
import NProgress from "nprogress";
import type { AppProps } from "next/app";
import ErrorBoundary from "@/components/Errors/ErrorBoundary";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  NProgress.configure({ showSpinner: false });
  // NProgress.configure({ trickle: false });

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      const user = auth.currentUser;
      const title = document.title;
      const analytics = getAnalytics();
      if (user) {
        setUserId(analytics, user.uid);
      }
      logEvent(analytics, "screen_view", {
        firebase_screen: router.asPath,
        firebase_screen_class: title,
      });
    }
  }, [router.asPath]);

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
