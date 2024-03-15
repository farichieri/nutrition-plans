import { Analytics } from "@vercel/analytics/react";
import { getAnalytics, logEvent, setUserId } from "firebase/analytics";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import ErrorBoundary from "@/components/Errors/ErrorBoundary";
import { Layout } from "@/layouts";
import { auth } from "@/services/firebase";
import "styles/globals.css";

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
      <>
        <Toaster />
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>

          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </>
    </ErrorBoundary>
  );
}
