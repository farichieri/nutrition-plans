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
  selectAuthSlice,
  setLoginError,
} from "@/features/authentication";
import {  Theme } from "@/types";
import { auth } from "@/services/firebase/firebase.config";
import { fetchProgress, setProgress } from "@/features/progress";
import { Inter } from "next/font/google";
import { onAuthStateChanged } from "firebase/auth";
import { selectLayoutSlice } from "@/store/slices/layoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {isAppVersionCorrect} from '@/utils'
import Head from "next/head";

const font = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { theme } = useSelector(selectLayoutSlice);
  const [_theme, setTheme] = useState<Theme | null>(null);
  const { user } = useSelector(selectAuthSlice);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const [progressRes, userMealsRes, mealsSettings] = await Promise.all([
          fetchProgress(user),
          fetchMeals(user.user_id),
          fetchMealsSettings(user.user_id),
        ]);
        if (
          progressRes.result === "success" &&
          userMealsRes.result === "success" &&
          mealsSettings.result === "success"
        ) {
          dispatch(setProgress(progressRes.data));
          dispatch(setUserMeals(userMealsRes.data));
          dispatch(setUserMealsSettings(mealsSettings.data));
        }
      };
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const res = isAppVersionCorrect();
      if (res.result === "success") {
        dispatch(setIsVerifyingUser());
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const [userRes] = await Promise.all([generateUserObject(user)]);
            if (userRes.result === "success") {
              dispatch(setUser(userRes.data));
            } else {
              dispatch(setLoginError());
            }
          } else {
            dispatch(setLoginError());
          }
        });
      }
    }
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
