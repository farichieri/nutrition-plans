import {
  Diet,
  NewDiet,
  selectPlansSlice,
  setDiet,
  fetchDietByPlanAndDate,
  DaySelector,
  PlanSelector,
  setIsGeneratingMeals,
  setDietOpened,
  buildDiet,
  generateMeals,
  PlanGeneratorTypeSelector,
  PlanGeneratorTypes,
  AutomatedMeals,
  ManualMeals,
  generateDietMeals,
} from "@/features/plans";
import { CompatiblePlans, Nutrition } from "@/features/foods";
import { PlansEnum } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UserAccount, selectAuthSlice } from "@/features/authentication";
import { UserMealsArr, selectMealsSlice } from "@/features/meals";
import { useRouter } from "next/router";
import PremiumLayout from "@/layouts/PremiumLayout";
import ReGenerateMeals from "@/features/plans/components/ReGenerateMeals";
import Spinner from "@/components/Loader/Spinner";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { user } = useSelector(selectAuthSlice);
  const { date, dietOpened, isGeneratingMeals, planGeneratorType } =
    useSelector(selectPlansSlice);
  const { meals } = useSelector(selectMealsSlice);
  const planID = PlansEnum[id as keyof CompatiblePlans];
  const nutrition_targets = user?.nutrition_targets;
  const userMealsArr: UserMealsArr = Object.values(meals).sort(
    (a, b) => a.order - b.order
  );
  const isAutomated = planGeneratorType === PlanGeneratorTypes.automated;
  const isManual = planGeneratorType === PlanGeneratorTypes.manual;

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
  // Fetchh foods por compatible_plan === planID, y rango de complejidad.
  // Filtrar Cook y time.
  // Y el size y el match de nutrients?
  // Si todas las comidas son moderadas, los sizes son equivalentes.
  // Para una dieta de 2000kcal, de 4 comidas, podemos hacer un 2000 / 4  * 1 = 500 kcal +-

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

  const generateAutomatedPlan = async () => {
    if (!nutrition_targets) return;
    dispatch(setIsGeneratingMeals(true));
    const res = await generateMeals(planID, userMealsArr, nutrition_targets);
    if (res.result === "success") {
      const { data } = res;
      const dietMeals = Object.values(data);
      const diet = buildDiet(dietMeals, planID);
      console.log({ diet });
      dispatch(setDietOpened(diet));
    } else {
      dispatch(setDietOpened(null));
    }
    dispatch(setIsGeneratingMeals(false));
  };

  const setDietSkeleton = (): void => {
    const mealsGenerated = generateDietMeals(Object.values(meals));
    const diet = buildDiet(Object.values(mealsGenerated), planID);
    dispatch(setDietOpened(diet));
  };

  useEffect(() => {
    setDietSkeleton();

    if (isAutomated) {
      if (planID) {
        generateAutomatedPlan();
      }
    }
  }, [planID]);

  return (
    <PremiumLayout>
      <section className="mt-[calc(1_*_var(--nav-h))] flex w-full select-none flex-col sm:mt-[var(--nav-h)]">
        {planID && (
          <div>
            <SubPremiumNav
              title={planID.replaceAll("_", " ")}
              customClass="top-[var(--subnav-h)]"
            >
              <PlanSelector planID={planID} />
            </SubPremiumNav>
            <div className="flex min-h-[100vh] flex-col items-start justify-start gap-5 bg-white p-4 pt-2 shadow-[0_1px_5px_lightgray] dark:bg-black dark:shadow-[0_1px_6px_#292929] sm:m-[0.5vw] sm:min-h-[calc(100vh_-_6rem_-_1vw)] sm:gap-5 sm:rounded-lg sm:border sm:p-8 sm:pt-2">
              <DaySelector />
              <div className="flex w-full items-center justify-between">
                {isAutomated && <ReGenerateMeals planID={planID} />}
                <PlanGeneratorTypeSelector />
              </div>
              {isGeneratingMeals || !dietOpened ? (
                <Spinner customClass="h-6 w-6 m-auto" />
              ) : (
                <div className="grid w-full gap-10 sm:grid-cols-fluid_lg">
                  <div className="w-full">
                    {isAutomated ? (
                      <AutomatedMeals dietOpened={dietOpened} />
                    ) : (
                      <ManualMeals dietOpened={dietOpened} />
                    )}
                  </div>
                  {dietOpened && (
                    <div className="w-full ">
                      <Nutrition nutrients={dietOpened.diet_nutrients} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </PremiumLayout>
  );
}
