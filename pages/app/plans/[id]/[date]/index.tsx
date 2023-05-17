import { MEAL_PLANS } from "@/utils/content";
import { useRouter } from "next/router";
import DayPlan from "@/components/Premium/Plans/DayPlan";
import PremiumLayout from "@/components/Layout/PremiumLayout";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const getPlans = () => {
    return MEAL_PLANS.find((plan) => plan.id === id);
  };

  const planData = getPlans();

  return (
    <PremiumLayout>{planData && <DayPlan planData={planData} />}</PremiumLayout>
  );
}
