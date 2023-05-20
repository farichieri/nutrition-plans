import {
  fetchRandomDietByPlan,
  postDietToUserDiets,
} from "@/firebase/helpers/Diet";
import { CompatiblePlans } from "@/types/foodTypes";
import { fetchDietByPlanAndDate } from "@/firebase/helpers/Diet";
import { PlansEnum, UserAccount } from "@/types/types";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { selectPlansSlice, setDiet } from "@/store/slices/plansSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import DayPlan from "@/components/Premium/Plans/DayPlan";
import DaySelector from "@/components/Premium/Plans/DaySelector";
import PlanSelector from "@/components/Premium/Plans/PlanSelector";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import SubPremiumNav from "@/components/Layout/SubPremiumNav";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { user } = useSelector(selectAuthSlice);
  const { date, dietOpened } = useSelector(selectPlansSlice);
  const planID = PlansEnum[id as keyof CompatiblePlans];

  const fetchUserDiet = async (
    date: string,
    planID: PlansEnum,
    user: UserAccount
  ) => {
    const result = await fetchDietByPlanAndDate({
      date,
      planID,
      user,
    });
    return result;
  };

  const getDiet = async (planID: PlansEnum) => {
    if (!user) return;
    const userDateDietRes = await fetchUserDiet(date, planID, user);
    // Verify if there is a diet for this plan and date.
    console.log({ userDateDietRes });
    if (userDateDietRes) {
      // Success => save in redux.
      dispatch(setDiet(userDateDietRes));
    } else {
      // Fetch a diet for my plan and diet.
      const diet = await fetchRandomDietByPlan({
        plan: planID,
      });
      if (diet) {
        // Save in my DB
        const result = await postDietToUserDiets({ diet, planID, date, user });
        console.log({ result });
        if (!result.error && result.newDiet) {
          // Save in Redux
          dispatch(setDiet(result.newDiet));
        }
      }
    }
  };

  useEffect(() => {
    if (!dietOpened) {
      if (planID && date) {
        console.log("asd");
        getDiet(planID);
      }
    }
  }, [router, dietOpened]);

  return (
    <PremiumLayout>
      <section className="mt-[var(--nav-h)] flex w-full select-none flex-col">
        {planID && (
          <>
            <SubPremiumNav>
              <span className="ml-5 font-semibold capitalize sm:text-xl">
                {planID.replaceAll("-", " ")}
              </span>
              <PlanSelector planID={planID} />
            </SubPremiumNav>
            <div className="flex min-h-[100vh] flex-col items-start justify-start gap-5 rounded-lg bg-white px-4 py-4 shadow-[0_1px_5px_lightgray] dark:bg-black dark:shadow-[0_1px_6px_#292929] sm:m-[1vw] sm:min-h-[calc(100vh_-_6rem_-_2vw)] sm:gap-5 sm:px-10">
              <DaySelector />
              <DayPlan planID={planID} />
            </div>
          </>
        )}
      </section>
    </PremiumLayout>
  );
}
