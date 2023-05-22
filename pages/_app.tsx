import "nprogress/nprogress.css";
import "@/styles/globals.css";
import "material-icons/iconfont/material-icons.css";
import { auth } from "@/firebase/firebase.config";
import { getAnalytics, logEvent, setUserId } from "firebase/analytics";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import NProgress from "nprogress";
import type { AppProps } from "next/app";
import AppLoader from "@/components/Loader/AppLoader";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  NProgress.configure({ showSpinner: false });
  NProgress.configure({ trickle: false });

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
    const handleStart = (url: string) => {
      console.log(`Loading: ${url}`);
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
    <Provider store={store}>
      <PersistGate loading={<AppLoader />} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
