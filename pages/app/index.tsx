import { selectAuthSlice } from "@/features/authentication/slice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader/Loader";
import PremiumLayout from "@/layouts/PremiumLayout";
import { AppRoutes } from "@/utils";

const App = () => {
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.planSelected) {
        router.push(AppRoutes.today);
      } else {
        router.push(`/app/progress`);
      }
    }
  }, [user, router]);

  return (
    <PremiumLayout>
      <Loader />
    </PremiumLayout>
  );
};

export default App;
