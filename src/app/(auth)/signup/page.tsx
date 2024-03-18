"use client";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Loader from "@/components/Loader/Loader";
import { Signup } from "@/features/authentication";
import { selectAuthSlice } from "@/features/authentication/slice";
import { AppRoutes } from "@/utils";

export default function Page() {
  const router = useRouter();
  const { user, isVerifyingUser, isSigningUser, isCreatingUser } =
    useSelector(selectAuthSlice);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && !isCreatingUser) router.push(AppRoutes.today);
    if (user && isCreatingUser) router.push(AppRoutes.create_user);
    if (!user && !isVerifyingUser) setIsLoading(false);
  }, [user, isVerifyingUser, isCreatingUser, router]);

  return (
    <>
      <Head>
        <title>Sign up | Nutrition Plans CO</title>
        <meta name="robots" content="noindex" />
      </Head>
      {(isLoading || isSigningUser || user) && <Loader />}
      <Signup />
      <div className="text-center">
        <p className="text-sm">
          <span className="opacity-50">By joining, you agree to our </span>
          <Link href={"/terms"}>Terms of Service</Link>{" "}
          <span className="opacity-50">and </span>
          <Link href={"/privacy"}>Privacy Policy</Link>
        </p>
      </div>
    </>
  );
}
