import {
  selectAuthSlice,
  setSubscription,
  useLoginMutation,
  useGetUserQuery,
} from "@/features/authentication";
import { auth } from "@/services/firebase";
import { getUserSubscription } from "@/features/stripe";
import { Inter } from "next/font/google";
import { isAppVersionCorrect } from "@/utils";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const font = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isVerifyingVersion, setIsVerifyingVersion] = useState(true);
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
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
    console.log("executed");
    if (user) {
      const unsubscribe = async () => {
        const res = await getUserSubscription({ userID: user.id });
        if (res.result === "success") {
          dispatch(setSubscription(res.data));
        } else {
          dispatch(setSubscription(null));
        }
      };
      unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div
      translate="no"
      className={`min-w-screen flex min-h-screen flex-col items-center justify-between ${font.className}`}
    >
      {children}
    </div>
  );
}
