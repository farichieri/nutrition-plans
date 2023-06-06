import {
  selectPlansSlice,
  setDietOpened,
  setIsGeneratingMeals,
} from "../slice";
import { buildDiet, generateMeals } from "../utils";
import { FC } from "react";
import { PlansEnum } from "@/types";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import { UserMealsArr, selectMealsSlice } from "@/features/meals";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  planID: PlansEnum;
}

const ReGenerateMeals: FC<Props> = ({ planID }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { meals } = useSelector(selectMealsSlice);
  const { isGeneratingMeals } = useSelector(selectPlansSlice);
  const nutrition_targets = user?.nutrition_targets;
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
      className="rounded-md border border-green-500 px-3 py-1.5 duration-300 hover:bg-green-700/40 active:bg-green-700"
      onClick={reGenerate}
    >
      {!isGeneratingMeals ? (
        <span className="m-auto">Re-Generate meals</span>
      ) : (
        <span className="flex items-center gap-1.5">
          <span>Generating meals...</span>
          <Spinner customClass="h-4 w-4 m-auto" />
        </span>
      )}
    </button>
  );
};

export default ReGenerateMeals;
