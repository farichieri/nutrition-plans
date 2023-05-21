import { selectAuthSlice } from "@/store/slices/authSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import Loader from "@/components/Loader/Loader";

const App = () => {
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();

  if (user) {
    if (!user.is_profile_completed) {
      router.push("/app/create");
    } else {
      if (user.plan_selected) {
        router.push(`/app/plans/${user.plan_selected}/today`);
      } else {
        router.push(`/app/profile/progress`);
      }
    }
  }

  return (
    <PremiumLayout>
      <Loader />
    </PremiumLayout>
  );
};

export default App;
