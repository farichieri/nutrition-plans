import { selectAuthSlice } from "@/store/slices/authSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import SignLayout from "@/components/Layout/SignLayout";
import Signup from "@/components/Auth/Signup";

export default function Page() {
  const router = useRouter();
  const { user, isVerifyingUser, isSigningUser } = useSelector(selectAuthSlice);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      router.push("/app");
    }
    if (!user && !isVerifyingUser) {
      setIsLoading(false);
    }
  }, [user, isVerifyingUser]);

  return (
    <SignLayout>
      {(isLoading || isSigningUser) && <Loader />}
      <Signup />
      <div className="mt- mb-5 text-center text-base">
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
