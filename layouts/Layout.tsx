import {
  getUser,
  selectAuthSlice,
  setIsFirstDataLoaded,
  setLoginError,
  setSubscription,
  setUser,
  updateUser,
} from "@/features/authentication";
import { auth } from "@/services/firebase";
import { getUserSubscription, usePremiumStatus } from "@/features/stripe";
import { Inter } from "next/font/google";
import { isAppVersionCorrect } from "@/utils";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import Head from "next/head";
import useTheme from "@/hooks/useTheme";

const font = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const _theme = useTheme();
  const [isVerifyingVersion, setIsVerifyingVersion] = useState(true);
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();
  const isPremium = usePremiumStatus(user);

  useEffect(() => {
    // To re-fetch data on refresh if user is logged in.
    dispatch(setIsFirstDataLoaded(false));
  }, []);

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
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
        </div>
      )}
    </>
  );
}
