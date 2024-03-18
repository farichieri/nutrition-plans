"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Loader from "@/components/Loader/Loader";
import { Login, selectAuthSlice } from "@/features/authentication";
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
        <title>Log in | Nutrition Plans CO</title>
        <meta name="robots" content="noindex" />
      </Head>
      {(isLoading || isSigningUser || user) && <Loader />}
      <Login />
    </>
  );
}
