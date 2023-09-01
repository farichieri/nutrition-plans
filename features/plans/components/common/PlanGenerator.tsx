import { PlansEnum } from "@/types";
import {
  PlanTypes,
  PlanTypesT,
  Diet,
  createDiet,
  createDietAutomatically,
} from "@/features/plans";
import { usePostDietToUserDietsMutation } from "@/features/plans/services";
import { ReplaceDietSelector } from "@/features/library";
import { setDiet } from "@/features/plans/slice";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { User, selectAuthSlice } from "@/features/authentication";
import { UserMeals, selectMealsSlice } from "@/features/meals";
import Modal from "@/components/Modal/Modal";
import React, { ChangeEvent, FC, useState } from "react";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  date: string | null;
  dates: string[] | null;
  setDoneGeneratingPlan: (value: boolean) => void;
}

const PlanGenerator: FC<Props> = ({ date, dates, setDoneGeneratingPlan }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { meals } = useSelector(selectMealsSlice);
  const [isLoadDayOpen, setIsLoadDayOpen] = useState(false);
  const [planSelected, setPlanSelected] = useState<PlansEnum>(
    user?.planSelected || PlansEnum.balanced
  );
  const plans = [
    planSelected,
    ...Object.values(PlansEnum).filter((p) => p !== planSelected),
  ];
  const [isGenerating, setIsGenerating] = useState(false);

  if (!user) return <></>;

  const [postDietToUserDiets] = usePostDietToUserDietsMutation();

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const value = event.target.value;
    if (Object.values(PlansEnum).includes(value as PlansEnum)) {
      setPlanSelected(value as PlansEnum);
    }
  };

  const generate = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const id = (event.target as HTMLButtonElement).id;
    const planType = PlanTypes[id as keyof PlanTypesT];
    try {
      setIsGenerating(true);
      if (date && !dates) {
        await createAndSaveDiet(date, planSelected, user, meals, planType);
      } else if (dates && !date) {
        await Promise.all(
          dates.map((d) =>
            createAndSaveDiet(d, planSelected, user, meals, planType)
          )
        ).then(() => setDoneGeneratingPlan(true));
      } else {
        toast.error("Error generating plan");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const createAndSaveDiet = async (
    date: string,
    planID: PlansEnum,
    user: User,
    meals: UserMeals,
    type: PlanTypes
  ) => {
    try {
      if (type === PlanTypes.automatically) {
        const createRes = await createDietAutomatically({
          meals,
          planID,
          type,
          user,
          date,
        });
        if (createRes.result === "error")
          throw new Error("Error creating diet");
        const diet: Diet = createRes.data;
        const res = await postDietToUserDiets({
          diet,
          planID,
          date,
          user,
        });
        if (!("error" in res)) {
          dispatch(setDiet(res.data));
        } else {
          throw new Error("Error saving diet");
        }
      } else if (type === PlanTypes.manually) {
        const diet: Diet = createDiet({ meals, planID, type, user, date });
        const res = await postDietToUserDiets({
          diet,
          planID,
          date,
          user,
        });
        if (!("error" in res)) {
          dispatch(setDiet(res.data));
        } else {
          throw new Error("Error saving diet");
        }
      } else {
        throw new Error("Invalid plan type");
      }
    } catch (error) {
      toast.error(`Error generating plan for ${date}`);
      console.log(error);
    }
  };

  return (
    <div
      id="tour-welcome-1"
      className="relative m-auto flex w-fit flex-col items-center justify-center gap-5 p-5"
    >
      {isGenerating ? (
        <Spinner customClass="mt-5 h-10 w-10 mx-auto" />
      ) : (
        <>
          {/* To be fixed with dates */}
          {isLoadDayOpen && (
            <Modal onClose={() => setIsLoadDayOpen(false)}>
              <ReplaceDietSelector
                date={date}
                dates={dates}
                handleClose={() => setIsLoadDayOpen(false)}
                setDoneGeneratingPlan={setDoneGeneratingPlan}
              />
            </Modal>
          )}
          <div className="m-auto flex flex-wrap items-center justify-center gap-2">
            <span className="text-lg font-semibold">Generate Plan:</span>
            <select
              value={planSelected}
              onChange={handleSelect}
              className="cursor-pointer border-b border-green-500 bg-transparent p-1 font-semibold capitalize text-green-500 outline-none"
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
          <div className="flex gap-5">
            {Object.keys(PlanTypes).map((p) => (
              <div key={p} className="flex flex-col items-center justify-start">
                <button
                  id={p}
                  className={`flex flex-col items-center justify-center rounded-md border border-green-500/30 bg-green-500/20 px-3 py-1.5 capitalize duration-100 hover:border-green-500 hover:bg-green-500/30 active:bg-green-500/80 ${
                    p === PlanTypes.automatically &&
                    "pointer-events-none cursor-not-allowed opacity-50"
                  }`}
                  onClick={generate}
                >
                  {p}
                </button>
                {p === PlanTypes.automatically && (
                  <span className="mx-auto mt-1 text-xs opacity-70">
                    Coming soon
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="tems-center m-2 flex w-full justify-center border-t p-4">
            <button
              onClick={() => setIsLoadDayOpen(true)}
              className="flex cursor-pointer items-center gap-0.5 border-b border-transparent text-xs text-blue-500 hover:border-blue-500"
            >
              <span className="">Load Saved Day</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PlanGenerator;

// ${
//   p === PlanTypes.automatically &&
//   "pointer-events-none cursor-not-allowed opacity-50"
// }

// {p === PlanTypes.automatically && (
//   <span className="mx-auto mt-1 text-xs opacity-70">
//     Coming soon
//   </span>
// )}
