import Login from "@/components/Auth/Login";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader/Loader";

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
    <section className="flex h-screen w-screen flex-col items-center justify-center p-4">
      {isLoading && <Loader />}
      <Login />
    </section>
  );
}
