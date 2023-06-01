import { selectAuthSlice } from "@/features/authentication";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDietOpened, setIsGeneratingMeals } from "../slice";
import { buildDiet, generateMeals } from "./utils";
import { PlansEnum } from "@/types";
import { UserMealsArr, selectMealsSlice } from "@/features/meals";

interface Props {
  planID: PlansEnum;
}

const ReGeneratePlan: FC<Props> = ({ planID }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const nutrition_targets = user?.nutrition_targets;
  const { meals } = useSelector(selectMealsSlice);
  const userMealsArr: UserMealsArr = Object.values(meals).sort(
    (a, b) => a.order - b.order
  );

  const reGenerate = async () => {
    if (!nutrition_targets) return;
    dispatch(setIsGeneratingMeals(true));
    const res = await generateMeals(planID, userMealsArr, nutrition_targets);
    if (res.result === "success") {
      const { data } = res;
      const dietMeals = Object.values(data);
      const diet = buildDiet(dietMeals, planID);
      dispatch(setDietOpened(diet));
    }
    dispatch(setIsGeneratingMeals(false));
  };

  return (
    <button
      className="m-1 rounded-md border border-green-500 px-3 py-1 duration-300 hover:bg-green-700/40 active:bg-green-700"
      onClick={reGenerate}
    >
      Re-Generate
    </button>
  );
};

export default ReGeneratePlan;
