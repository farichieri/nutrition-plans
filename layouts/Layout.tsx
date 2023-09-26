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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import useTheme from "@/hooks/useTheme";

const font = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  // const _theme = useTheme();
  const [isVerifyingVersion, setIsVerifyingVersion] = useState(true);
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();
  const isPremium = usePremiumStatus(user);
  const [login] = useLoginMutation();
  const [updateUser] = useUpdateUserMutation();
  useGetUserQuery({ userID: user?.id });

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
  }, [isVerifyingVersion, login]);

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
  }, [isPremium, dispatch, user, updateUser]);

  return (
    <div
      translate="no"
      className={`min-w-screen flex min-h-screen flex-col items-center justify-between ${font.className}`}
    >
      {children}
    </div>
  );
}
