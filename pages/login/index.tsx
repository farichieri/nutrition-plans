import { AppRoutes } from "@/utils";
import { selectAuthSlice, Login } from "@/features/authentication";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader/Loader";
import SignLayout from "@/layouts/SignLayout";

export default function Page() {
  const router = useRouter();
  const { user, isVerifyingUser, isSigningUser, isCreatingUser } =
    useSelector(selectAuthSlice);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && !isCreatingUser) router.push(AppRoutes.today);
    if (user && isCreatingUser) router.push(AppRoutes.create_user);
    if (!user && !isVerifyingUser) setIsLoading(false);
  }, [user, isVerifyingUser, isCreatingUser]);

  return (
    <SignLayout>
      {(isLoading || isSigningUser) && <Loader />}
      <Login />
    </SignLayout>
  );
}
