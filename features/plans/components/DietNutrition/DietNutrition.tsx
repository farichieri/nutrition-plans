import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { checkTargetsEquality } from "../../utils";
import { Diet } from "../../types";
import { FC, useEffect, useState } from "react";
import { FoodNutrients, FoodNutritionDetail } from "@/features/foods";
import { formatToFixed, formatTwoDecimals } from "@/utils/format";
import { getDietNutritionTargets } from "./utils/getDietNutritionTargets";
import { MdClose } from "react-icons/md";
import { PlansEnum } from "@/types";
import { RoundButton } from "@/components/Buttons";
import { selectAuthSlice } from "@/features/authentication";
import { setDiet } from "../../slice";
import { toast } from "react-hot-toast";
import { updateDiet } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import PieGraph from "@/components/PieGraph/PieGraph";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  nutrients: FoodNutrients;
  planID: PlansEnum | null;
  diet: Diet;
  isEditing: boolean;
}

const DietNutrition: FC<Props> = ({ nutrients, diet, isEditing }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [differFromUserTargets, setDifferFromUserTargets] = useState(false);
  const [loading, setLoading] = useState({
    updateWithUserTargets: false,
    hideNutritionDiff: false,
  });

  if (!user) return <></>;

  if (!nutrients) {
    return <div>No Nutrients Found.</div>;
  }

  const { nutritionTargets: userNutritionTargets } = user;
  const { nutritionTargets: dietNutritionTargets, hideNutritionTargetsDiff } =
    diet;
  // Make nutritionTargets individual for each diet. If there is an old diet, use that one, otherwise use the user's nutritionTargets
  const nutritionTargets = dietNutritionTargets || userNutritionTargets;

  const { NUTRIENT_TARGETS, isAllInRange } = getDietNutritionTargets({
    nutritionTargets,
    nutrients,
  });

  useEffect(() => {
    if (!userNutritionTargets || !dietNutritionTargets) {
      setDifferFromUserTargets(false);
      return;
    }
    const areEqual = checkTargetsEquality({
      userTargets: userNutritionTargets,
      dietTargets: dietNutritionTargets,
    });
    if (!areEqual) {
      setDifferFromUserTargets(true);
    } else {
      setDifferFromUserTargets(false);
    }
  }, [userNutritionTargets, dietNutritionTargets]);

  const updateWithUserTargets = async () => {
    try {
      setLoading({ ...loading, updateWithUserTargets: true });
      if (isEditing) {
        toast.error("Please save your changes first.");
        return;
      }
      const newDiet = { ...diet };
      newDiet.nutritionTargets = userNutritionTargets;
      const res = await updateDiet({ diet: newDiet });
      if (res.result === "error") {
        toast.error("Error updating targets. Please try again.");
      } else {
        dispatch(setDiet(newDiet));
        toast.success("Targets updated successfully.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading({ ...loading, updateWithUserTargets: false });
    }
  };

  const handleHideNutritionDiff = async () => {
    try {
      setLoading({ ...loading, hideNutritionDiff: true });
      if (isEditing) {
        toast.error("Please save your changes first.");
        return;
      }
      const newDiet = { ...diet };
      newDiet.hideNutritionTargetsDiff = true;
      const res = await updateDiet({ diet: newDiet });
      if (res.result === "error") {
        toast.error("Error updating targets. Please try again.");
      } else {
        dispatch(setDiet(newDiet));
      }
    } catch (error) {
      toast.error("Error updating targets. Please try again.");
      console.log(error);
    } finally {
      setLoading({ ...loading, hideNutritionDiff: false });
    }
  };

  return (
    <div className="w-full ">
      <div className="mb-1 flex h-9 w-full items-center gap-2">
        <BiSolidPieChartAlt2 className="h-6 w-6 text-green-500" />
        <span className="text-2xl font-semibold">Nutrition</span>
      </div>
      <div
        className={`relative flex w-full flex-col rounded-xl border p-4 shadow-md dark:shadow-slate-500/20 ${
          !isAllInRange
            ? "bg-white dark:bg-gray-500/20"
            : "border-green-500 bg-green-500/20 "
        }`}
      >
        <PieGraph nutrients={nutrients} />
        <div
          className={`relative mb-4 flex w-full items-center justify-center rounded-md ${
            !isAllInRange ? "" : ""
          }`}
        >
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col divide-y border-b">
              {NUTRIENT_TARGETS.map((nut) => {
                return (
                  <div className="flex items-center" key={nut.nutrient}>
                    <span className="flex basis-1/2 truncate capitalize">
                      {nut.nutrient}
                    </span>
                    <div
                      className={`flex basis-1/3 justify-end text-xs opacity-50 `}
                    >
                      {nut.min && (
                        <>
                          <span>
                            {"("}
                            {nut.min}
                          </span>
                          -
                        </>
                      )}
                      <span>
                        {nut.max}
                        {")"}
                      </span>
                    </div>
                    <div className="relative ml-auto flex basis-1/12 items-center justify-end ">
                      <div className="mx-2 w-12 ">
                        {Number(nut.value) > Number(nut.max) && (
                          <span className="flex text-xs text-red-500">
                            {formatTwoDecimals(nut.diff)}🔻
                          </span>
                        )}
                        {Number(nut.value) < Number(nut.min) && (
                          <span className="flex text-xs text-red-500">
                            {formatTwoDecimals(nut.diff)}🔺
                          </span>
                        )}
                      </div>
                      <span
                        className={` w-14 ${
                          nut.isInRange ? "text-green-500" : ""
                        }`}
                      >
                        {formatTwoDecimals(nut.value) || "-"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col">
              <div className="flex w-full justify-between">
                <span>Fiber:</span>
                <span>{nutrients.fiber || "-"}</span>
              </div>
              <div className="flex w-full justify-between">
                <span>Net carbs:</span>
                <span>
                  {formatToFixed(
                    Number(nutrients.carbohydrates) - Number(nutrients.fiber)
                  ) || "-"}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex w-full justify-between">
                <span>Sodium:</span>
                <span>{nutrients.sodium || "-"}</span>
              </div>
              <div className="flex w-full justify-between">
                <span>Cholesterol:</span>
                <span>{nutrients.cholesterol || "-"}</span>
              </div>
            </div>
          </div>
        </div>
        {differFromUserTargets && !hideNutritionTargetsDiff && (
          <div className="relative my-2 flex flex-col items-center justify-center rounded-md border border-red-500 bg-red-400/40 p-2">
            <RoundButton
              onClick={handleHideNutritionDiff}
              customClass="p-1 h-7 w-7 absolute right-1 top-1 "
            >
              {loading.hideNutritionDiff ? (
                <Spinner customClass={`h-4 w-4`} />
              ) : (
                <MdClose className="h-5 w-5" />
              )}
            </RoundButton>
            <span>Day targets differ from your personal nutrition targets</span>
            <button
              onClick={updateWithUserTargets}
              className="flex items-center rounded-3xl border border-blue-500 bg-blue-400 px-3 py-1.5"
            >
              Update with my targets
              {loading.updateWithUserTargets && (
                <Spinner customClass={`h-4 w-4 ml-2`} />
              )}
            </button>
          </div>
        )}
        <FoodNutritionDetail nutrients={nutrients} />
        <div>
          {isAllInRange ? (
            <span className="my-4 flex w-full justify-center text-green-500 ">
              Good Job 💪! Nutrients target achieved.
            </span>
          ) : (
            <span className="my-4 flex w-full justify-center text-red-500 ">
              You are out of target.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietNutrition;
