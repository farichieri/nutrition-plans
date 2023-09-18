import {
  selectAuthSlice,
  setSubscription,
  useUpdateUserMutation,
  useLoginMutation,
  useGetUserQuery,
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
import { Analytics } from "@vercel/analytics/react";

const font = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const _theme = useTheme();
  const [isVerifyingVersion, setIsVerifyingVersion] = useState(true);
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();
  const isPremium = usePremiumStatus(user);
  const [login] = useLoginMutation();
  const [updateUser] = useUpdateUserMutation();
  const {} = useGetUserQuery({ userID: user?.id });

  useEffect(() => {
    // Verify Version and then log log in.
    if (typeof window !== "undefined") {
      isAppVersionCorrect();
      setIsVerifyingVersion(false);
    }
    if (!isVerifyingVersion) {
      // Verify User
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        await login({ userID: user?.uid });
      });
      return () => unsubscribe();
    }
  }, [isVerifyingVersion]);

  useEffect(() => {
    if (user) {
      if (isPremium !== user.isPremium) {
        const unsubscribe = async () => {
          await updateUser({ user, fields: { isPremium } });
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
        <title>Nutrition Plans CO</title>
      </Head>
      {_theme && (
        <main
          translate="no"
          className={`min-w-screen flex min-h-screen flex-col items-center justify-between ${font.className}`}
        >
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Analytics />
        </main>
      )}
    </>
  );
}
