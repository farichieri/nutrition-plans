import {
  fetchMeals,
  fetchMealsSettings,
  setUserMeals,
  setUserMealsSettings,
} from "@/features/meals";
import {
  getUser,
  selectAuthSlice,
  setIsFirstDataLoaded,
  setLoginError,
  setSubscription,
  setUser,
  updateUser,
} from "@/features/authentication";
import { auth } from "@/services/firebase/firebase.config";
import { fetchProgress, setProgress } from "@/features/progress";
import { getThisWeekDiets } from "@/features/plans";
import { getUserSubscription, usePremiumStatus } from "@/features/stripe";
import { Inter } from "next/font/google";
import { isAppVersionCorrect } from "@/utils";
import { onAuthStateChanged } from "firebase/auth";
import { setDiets } from "@/features/plans/slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Head from "next/head";
import useTheme from "@/hooks/useTheme";

const font = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [isVerifyingVersion, setIsVerifyingVersion] = useState(true);
  const _theme = useTheme();
  const isPremium = usePremiumStatus(user);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const [progressRes, userMealsRes, mealsSettings, thisWeekDiets] =
          await Promise.all([
            fetchProgress(user),
            fetchMeals(user.id),
            fetchMealsSettings(user.id),
            getThisWeekDiets({ user }),
          ]);
        if (
          progressRes.result === "success" &&
          userMealsRes.result === "success" &&
          mealsSettings.result === "success" &&
          thisWeekDiets.result === "success"
        ) {
          dispatch(setProgress(progressRes.data));
          dispatch(setUserMeals(userMealsRes.data));
          dispatch(setUserMealsSettings(mealsSettings.data));
          dispatch(setDiets(thisWeekDiets.data));
          dispatch(setIsFirstDataLoaded(true));
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
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
      return () => unsubscribe();
    }
  }, [isVerifyingVersion]);

  useEffect(() => {
    if (user) {
      if (isPremium !== user.isPremium) {
        const unsubscribe = async () => {
          const res = await updateUser({ user, fields: { isPremium } });
          if (res.result === "success") {
            dispatch(setUser({ ...user, isPremium }));
          }
        };
        unsubscribe();
      }
      if (isPremium) {
        const unsubscribe = async () => {
          const res = await getUserSubscription({ userID: user.id });
          if (res.result === "success") {
            dispatch(setSubscription(res.data));
          }
        };
        unsubscribe();
      }
    }
  }, [isPremium]);

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
            className="min-w-screen flex min-h-screen flex-col items-center justify-between "
          >
            {children}
          </main>
        </div>
      )}
    </>
  );
}
