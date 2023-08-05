import { DietMeal, Diet, resetMeal, replaceMealInDiet } from "@/features/plans";
import { FC, useState } from "react";
import { getNutritionMerged } from "@/utils";
import { selectAuthSlice } from "@/features/authentication";
import { setDiet } from "@/features/plans/slice";
import { updateDiet } from "@/features/plans/services";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  diet?: Diet;
  handleClose: () => void;
  isReplaceable: boolean;
  meal: DietMeal;
  replaceMealID: string | null;
}

const MealCard: FC<Props> = ({
  meal,
  diet,
  handleClose,
  replaceMealID,
  isReplaceable,
}) => {
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return <></>;

  const nutritionMerged = getNutritionMerged(meal.foods);
  const { calories } = nutritionMerged;

  const handleSelect = async () => {
    // Lo unico que tengo q hacer al reemplazar una meal, es cambiarle las foods,
    // el nombre y los ids. El resto se mantiene igual.
    try {
      setIsLoading(true);
      if (!replaceMealID || !diet?.id) throw Error;
      // const mealResetted = resetMeal({
      //   meal,
      //   newMealID: replaceMealID,
      //   newDietID: diet.id,
      //   newMealName: diet.meals[replaceMealID].name,
      // });
      // if (mealResetted.result === "error") throw Error;
      // const newDiet = {
      //   ...diet,
      //   meals: {
      //     ...diet.meals,
      //     [replaceMealID]: mealResetted.data,
      //   },
      // };
      const newDiet = replaceMealInDiet({
        diet,
        meal,
        replaceMealID: replaceMealID,
      });
      const res = await updateDiet({
        diet: newDiet,
      });
      if (res.result === "success") {
        dispatch(setDiet(res.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <div
      className={`flex w-full items-center justify-start gap-2 rounded-lg border bg-slate-200/50 dark:bg-gray-500/10`}
    >
      <div className="flex h-full min-w-fit flex-col items-center justify-center border-r px-2 py-4">
        {meal && (
          <span className="text-xl font-semibold capitalize text-green-500">
            {meal?.planID?.replaceAll("_", " ")}
          </span>
        )}
        {calories && (
          <span className="min-w-fit text-xs opacity-70">
            {calories} calories
          </span>
        )}
      </div>

      <div className="flex w-full items-center justify-between gap-2 px-2 py-4">
        <div className="flex w-full flex-col">
          <span className="font-semibold">{meal.nameSaved}</span>
          <span className="text-sm opacity-70">{meal.description}</span>
        </div>
        <div className="">
          {!isReplaceable ? (
            <Link
              href={`/app/library/meals/${meal.id}`}
              className="activ:bg-slate-600/50 rounded-3xl border bg-slate-500/20 px-3 py-1.5"
            >
              Open
            </Link>
          ) : (
            <button
              onClick={handleSelect}
              className="activ:bg-slate-600/50 rounded-3xl border bg-slate-500/20 px-3 py-1.5"
            >
              {isLoading ? (
                <div className="flex items-center gap-1">
                  <span className="">Replacing...</span>
                  <Spinner customClass="h-4 w-4" />
                </div>
              ) : (
                "Replace"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealCard;
