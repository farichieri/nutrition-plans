import {
  PlanTypes,
  PlanTypesT,
  Diet,
  createDiet,
  postDietToUserDiets,
  setDiet,
} from "@/features/plans";
import { PlansEnum } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { UserAccount, selectAuthSlice } from "@/features/authentication";
import { UserMeals, selectMealsSlice } from "@/features/meals";
import React, { ChangeEvent, FC, useState } from "react";

interface Props {
  date: string;
  setIsGeneratingPlan: Function;
}

const PlanGenerator: FC<Props> = ({ date, setIsGeneratingPlan }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { meals } = useSelector(selectMealsSlice);
  const [planSelected, setPlanSelected] = useState<PlansEnum>(
    user?.planSelected || PlansEnum.balanced
  );
  const plans = [
    planSelected,
    ...Object.values(PlansEnum).filter((p) => p !== planSelected),
  ];

  if (!user) return <></>;

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const value = event.target.value;
    if (Object.values(PlansEnum).includes(value as PlansEnum)) {
      setPlanSelected(value as PlansEnum);
    }
  };

  const generatePlan = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault;
    const id = (event.target as HTMLButtonElement).id;
    const planType = PlanTypes[id as keyof PlanTypesT];

    createAndSaveDiet(date, planSelected, user, meals, planType);
  };

  const createAndSaveDiet = async (
    date: string,
    planID: PlansEnum,
    user: UserAccount,
    meals: UserMeals,
    type: PlanTypes
  ) => {
    setIsGeneratingPlan(true);
    const diet: Diet = createDiet(meals, planID, type, user.bodyData);
    const res = await postDietToUserDiets({
      diet,
      planID,
      date,
      user,
    });
    if (res.result === "success") {
      dispatch(setDiet(res.data));
    }
    setIsGeneratingPlan(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-5">
      <div className="m-auto flex flex-wrap items-center justify-center gap-2">
        <span className="text-lg font-semibold">Generate Plan:</span>
        <select
          value={planSelected}
          onChange={handleSelect}
          className="cursor-pointer border-b border-green-500 bg-transparent p-2 font-semibold capitalize text-green-500 outline-none"
        >
          {plans.map((plan) => (
            <option
              key={plan}
              value={plan}
              className={` rounded-none py-1 font-semibold capitalize text-black dark:bg-slate-500`}
            >
              {plan.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </div>
      <div className="flex  gap-5">
        {Object.keys(PlanTypes).map((p) => (
          <button
            id={p}
            className={`rounded-md border border-green-500/30 bg-green-500/20 px-3 py-1.5 capitalize duration-100 hover:border-green-500 hover:bg-green-500/30 active:bg-green-500/80`}
            key={p}
            onClick={generatePlan}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlanGenerator;
