import Loader from "@/components/Loader/Loader";
import { selectAuthSlice } from "@/features/authentication/slice";
import PremiumLayout from "@/layouts/PremiumLayout";
import { AppRoutes } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

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
