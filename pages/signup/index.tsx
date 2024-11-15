import { AppRoutes } from "@/utils";
import { selectAuthSlice } from "@/features/authentication/slice";
import { Signup } from "@/features/authentication";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import SignLayout from "@/layouts/SignLayout";
import Head from "next/head";

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
    <SignLayout>
      <Head>
        <title>Sign up | Nutrition Plans CO</title>
        <meta name="robots" content="noindex" />
      </Head>
      {(isLoading || isSigningUser || user) && <Loader />}
      <Signup />
      <div className="text-center text-base">
        <p>
          <span className="opacity-50">By joining, you agree to our </span>
          <Link href={"/terms"}>Terms of Service</Link>{" "}
          <span className="opacity-50">and </span>
          <Link href={"/privacy"}>Privacy Policy</Link>
        </p>
      </div>
    </SignLayout>
  );
}
