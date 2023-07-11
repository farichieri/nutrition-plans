import {
  setUserMeals,
  setUserMealsSettings,
  fetchMeals,
  fetchMealsSettings,
} from "@/features/meals";
import {
  setUser,
  getUser,
  selectAuthSlice,
  setLoginError,
  setIsSigningUser,
} from "@/features/authentication";
import { auth } from "@/services/firebase/firebase.config";
import { fetchProgress, setProgress } from "@/features/progress";
import { Inter } from "next/font/google";
import { isAppVersionCorrect } from "@/utils";
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
  const { user } = useSelector(selectAuthSlice);
  const [isVerifyingVersion, setIsVerifyingVersion] = useState(true);

  useEffect(() => {
    if (
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      document.documentElement
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#111010");
      setTheme(Theme.Dark);
    } else {
      document.documentElement.classList.add("light");
      document.documentElement
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#fff");
      setTheme(Theme.Light);
    }
  }, [theme]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const [progressRes, userMealsRes, mealsSettings] = await Promise.all([
          fetchProgress(user),
          fetchMeals(user.id),
          fetchMealsSettings(user.id),
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
    // Verify Version and then log log in.
    if (typeof window !== "undefined") {
      isAppVersionCorrect();
      setIsVerifyingVersion(false);
    }
    if (!isVerifyingVersion) {
      // Verify User
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const [userRes] = await Promise.all([getUser(user.uid)]);
          if (userRes.result === "success") {
            dispatch(setUser(userRes.data));
          } else {
            dispatch(setLoginError());
          }
        } else {
          dispatch(setLoginError());
        }
      });
    } else {
      dispatch(setIsSigningUser(true));
    }
  }, [isVerifyingVersion]);

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
