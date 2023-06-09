import { selectAuthSlice } from "@/features/authentication/slice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader/Loader";
import PremiumLayout from "@/layouts/PremiumLayout";

const App = () => {
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();

  const checkUser = () => {
    if (user) {
      if (!user.is_profile_completed) {
        router.push("/app/create");
      } else {
        if (user.plan_selected) {
          router.push(`/app/today`);
        } else {
          router.push(`/app/profile/progress`);
        }
      }
    }
  };

  console.log({ user });

  useEffect(() => {
    checkUser();
  }, [user]);

  return (
    <PremiumLayout>
      <Loader />
    </PremiumLayout>
  );
};

export default App;
