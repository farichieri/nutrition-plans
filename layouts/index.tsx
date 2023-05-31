import {
  setUserMeals,
  setUserMealsSettings,
  fetchMeals,
  fetchMealsSettings,
} from "@/features/meals";
import {
  setIsVerifyingUser,
  setUser,
  generateUserObject,
} from "@/features/authentication";
import { auth } from "@/services/firebase/firebase.config";
import { fetchProgress, setProgress } from "@/features/progress";
import { Inter } from "next/font/google";
import { onAuthStateChanged } from "firebase/auth";
import { selectLayoutSlice } from "@/store/slices/layoutSlice";
import { Theme } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Head from "next/head";

const font = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { theme } = useSelector(selectLayoutSlice);
  const [_theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    dispatch(setIsVerifyingUser());
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const [userRes, progressRes, userMealsRes, mealsSettings] =
          await Promise.all([
            generateUserObject(user),
            fetchProgress(user),
            fetchMeals(user.uid),
            fetchMealsSettings(user.uid),
          ]);
        if (
          userRes.result === "success" &&
          progressRes.result === "success" &&
          userMealsRes.result === "success" &&
          mealsSettings.result === "success"
        ) {
          dispatch(setUser(userRes.data));
          dispatch(setProgress(progressRes.data));
          dispatch(setUserMeals(userMealsRes.data));
          dispatch(setUserMealsSettings(mealsSettings.data));
        }
      } else {
        dispatch(setUser(null));
      }
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
          <main
            translate="no"
            className="min-w-screen flex min-h-screen flex-col items-center justify-between overflow-hidden "
          >
            {children}
          </main>
        </div>
      )}
    </>
  );
}
