import { selectAuthSlice } from "@/store/slices/authSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader/Loader";
import PremiumLayout from "@/components/Layout/PremiumLayout";

const App = () => {
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.plan_selected) {
        router.push(`/app/plans/${user.plan_selected}`);
      } else {
        router.push(`/app/plan-calculator`);
      }
    }
  });

  return (
    <PremiumLayout>
      <Loader />
    </PremiumLayout>
  );
};

export default App;
