import { selectAuthSlice } from "@/store/slices/authSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Signup from "@/components/Auth/Signup";
import Loader from "@/components/Loader/Loader";
import SignLayout from "@/components/Layout/SignLayout";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const { user, isVerifyingUser } = useSelector(selectAuthSlice);
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
      {isLoading && <Loader />}
      {/* <div className="flex w-fit min-w-fit justify-start pt-3 font-bold xxs:text-sm xs:text-base sm:text-2xl">
        <Link href={"/"}>Nutrition Plans</Link>
      </div> */}
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
