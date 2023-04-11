import { auth } from "@/firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { selectLayoutSlice, setTheme } from "@/store/slices/layoutSlice";
import { setIsVerifyingUser, setUser } from "@/store/slices/authSlice";
import { Theme } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Work_Sans } from "next/font/google";
import Head from "next/head";

const font = Work_Sans({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { theme } = useSelector(selectLayoutSlice);

  useEffect(() => {
    dispatch(setIsVerifyingUser());
    onAuthStateChanged(auth, async (user) => {
      dispatch(setUser(user));
    });
  }, []);

  useEffect(() => {
    console.log({ theme });
    if (
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      dispatch(setTheme(Theme.dark));
    } else {
      document.documentElement.classList.add("light");
      dispatch(setTheme(Theme.light));
    }
  }, [theme]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nutrition Plans</title>
      </Head>
      {theme && (
        <div className={font.className}>
          <main className="min-w-screen flex min-h-screen flex-col items-center justify-between ">
            {children}
          </main>
        </div>
      )}
    </>
  );
}
