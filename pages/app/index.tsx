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
      if (!user.is_profile_completed) {
        router.push("/app/create");
      } else {
        if (user.plan_selected) {
          router.push(`/app/plans/${user.plan_selected}`);
        } else {
          router.push(`/app/evolution/profile`);
        }
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
