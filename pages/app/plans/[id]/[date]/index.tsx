import {
  fetchRandomDietByPlan,
  postDietToUserDiets,
} from "@/firebase/helpers/Diet";
import { CompatiblePlans } from "@/types/foodTypes";
import { Diet } from "@/types/dietTypes";
import { fetchDietByPlanAndDate } from "@/firebase/helpers/Diet";
import { NewDiet } from "@/types/dietTypes";
import { PlansEnum, UserAccount } from "@/types/types";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { selectPlansSlice, setDiet } from "@/store/slices/plansSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DaySelector from "@/components/Premium/Plans/DaySelector";
import Nutrition from "@/components/Premium/Food/Nutrition";
import PlanSelector from "@/components/Premium/Plans/PlanSelector";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import SubPremiumNav from "@/components/Layout/SubPremiumNav";
import PlanMeals from "@/components/Premium/Plans/PlanMeals";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { user } = useSelector(selectAuthSlice);
  const { date, dietOpened } = useSelector(selectPlansSlice);
  const planID = PlansEnum[id as keyof CompatiblePlans];

  // const { nutrition_targets } = user;

  const [newDiet, setNewDiet] = useState(NewDiet);

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

  // Quiero que se me arme una dieta personalizada para mi dia,
  // Teniendo en cuenta mi plan seleccionado, mis nutrientes y mis meals.
  // Por ende, una opcion para crearla es:
  // Teniendo en cuenta las meals y sus settings (complejidad, size, time and cook)
  // Hacer un fetch de foods para cada meal
  // Y luego dividir las proporciones en base a los valores nutricionales.
  // Problemas: Como encontrar esas comidas que cumplan con los valores macros que necesito.

  const getDiet = async (planID: PlansEnum) => {
    if (!user) return;
    const userDateDietRes = await fetchUserDiet(date, planID, user);
    // Verify if there is a diet for this plan and date.
    console.log({ userDateDietRes });
    if (userDateDietRes) {
      // Success => save in redux.
      dispatch(setDiet(userDateDietRes));
    } else {
      const newDiet: Diet = NewDiet;
      // create new Diet
      // Fetch a diet for my plan and diet.
      // const diet = await fetchRandomDietByPlan({
      //   plan: planID,
      // });
      // if (diet) {
      //   // Save in my DB
      //   const result = await postDietToUserDiets({ diet, planID, date, user });
      //   console.log({ result });
      //   if (!result.error && result.newDiet) {
      //     // Save in Redux
      //     dispatch(setDiet(result.newDiet));
      //   }
      // } else {
      //   console.log("No Diet Available");
      // }
    }
  };

  useEffect(() => {
    if (!dietOpened) {
      if (planID && date) {
        getDiet(planID);
      }
    }
  }, [router, dietOpened]);

  return (
    <PremiumLayout>
      <section className="mt-[calc(1_*_var(--nav-h))] flex w-full select-none flex-col sm:mt-[var(--nav-h)]">
        {planID && (
          <div>
            <SubPremiumNav customClass="top-[var(--subnav-h)]">
              <div className="min-w-fit">
                <span className="font-semibold capitalize sm:ml-5 sm:text-xl">
                  {planID.replaceAll("_", " ")}
                </span>
              </div>
              <PlanSelector planID={planID} />
            </SubPremiumNav>
            <div className="flex min-h-[100vh] flex-col items-start justify-start gap-5 bg-white p-4 pt-2 shadow-[0_1px_5px_lightgray] dark:bg-black dark:shadow-[0_1px_6px_#292929] sm:m-[0.5vw] sm:min-h-[calc(100vh_-_6rem_-_1vw)] sm:gap-5 sm:rounded-lg sm:border sm:p-8 sm:pt-2">
              <DaySelector />
              <div className="flex w-full flex-wrap gap-10">
                <div className="3xl:max-w-xl w-full max-w-lg">
                  <PlanMeals planID={planID} />
                </div>
                {dietOpened && (
                  <div className="3xl:max-w-xl w-full max-w-lg">
                    <Nutrition nutrients={dietOpened.diet_nutrients} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </PremiumLayout>
  );
}
