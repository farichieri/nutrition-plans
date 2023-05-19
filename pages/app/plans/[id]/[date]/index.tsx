import { MEAL_PLANS } from "@/utils/content";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import DayPlan from "@/components/Premium/Plans/DayPlan";
import PlanSelector from "@/components/Premium/Plans/PlanSelector";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import SubPremiumNav from "@/components/Layout/SubPremiumNav";
import { useEffect, useState } from "react";
import { getToday } from "@/utils/dateFormat";
import { fetchDietByDate } from "@/firebase/helpers/Diet";
import { setDiet } from "@/store/slices/dietsSlice";
import { PlansEnum } from "@/types/types";
import DaySelector from "@/components/Premium/Plans/DaySelector";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  // const { user } = useSelector(selectAuthSlice);
  const [planData, setPlanData] = useState<any>(null);
  const today = getToday();

  const getPlans = () => {
    return MEAL_PLANS.find((plan) => plan.id === id);
  };

  const getDiet = async (planID: string) => {
    // Habria que cambiar al manera de fetchear el planData y con types enum de planes.
    const result = await fetchDietByDate({
      date_available: today,
    });
    if (result) {
      dispatch(setDiet(result));
    }
  };

  useEffect(() => {
    const data = getPlans();
    if (data) {
      getDiet(data.id);
      setPlanData(data);
    }
  }, [router]);

  return (
    <PremiumLayout>
      <section className="flex w-full select-none flex-col gap-[var(--nav-h)]">
        {planData && (
          <>
            <SubPremiumNav>
              <span className="ml-5 font-semibold sm:text-xl">
                {planData.name}
              </span>
              <PlanSelector planData={planData} />
            </SubPremiumNav>

            <DayPlan planData={planData} />
          </>
        )}
      </section>
    </PremiumLayout>
  );
}
