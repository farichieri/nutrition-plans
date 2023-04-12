import { auth } from "@/firebase/firebase.config";
import { generateUserObject } from "@/firebase/helpers/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { selectLayoutSlice } from "@/store/slices/layoutSlice";
import { setIsVerifyingUser, setUser } from "@/store/slices/authSlice";
import { Theme } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Work_Sans } from "next/font/google";
import Head from "next/head";

const font = Work_Sans({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { theme } = useSelector(selectLayoutSlice);
  const [_theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    dispatch(setIsVerifyingUser());
    onAuthStateChanged(auth, async (user) => {
      const userObject = user && (await generateUserObject(user));
      dispatch(setUser(userObject));
    });
  }, []);

  useEffect(() => {
    if (
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme(Theme.dark);
    } else {
      document.documentElement.classList.add("light");
      setTheme(Theme.light);
    }
  }, [theme]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nutrition Plans</title>
      </Head>
      {_theme && (
        <div className={font.className}>
          <main className="min-w-screen flex min-h-screen flex-col items-center justify-between ">
            {children}
          </main>
        </div>
      )}
    </>
  );
}
