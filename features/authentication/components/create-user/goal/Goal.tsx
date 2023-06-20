import {
  UserAccount,
  UserGoals,
  WeightGoal,
  selectAuthSlice,
  setUpdateUser,
  updateUser,
} from "@/features/authentication";
import { DevTool } from "@hookform/devtools";
import { FC, useEffect, useState } from "react";
import { format, formatISO, parse } from "date-fns";
import { AppRoutes, formatToUSDate } from "@/utils";
import { getWeight, getWeightInKg, getWeightUnit } from "@/utils/calculations";
import { schema } from "./schema";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Collapsable from "@/components/Layout/Collapsable";
import FormError from "@/components/Errors/FormError";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import InfoMessage from "@/components/Layout/InfoMessage";

interface FormValues {
  goalSelected: UserGoals | null;
  weight_goal: WeightGoal;
}

interface Props {
  handleContinue: Function;
}

const Goal: FC<Props> = ({ handleContinue }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const isCreatingRoute = router.asPath === AppRoutes.create_user;

  useEffect(() => {
    register("goalSelected");
  }, []);

  if (!user) return <></>;

  const { measurement_unit, goal, weight_goal } = user;
  const { weight_goal_in_kg, due_date } = weight_goal;

  const weightGoalFormatted = getWeight({
    to: measurement_unit,
    weight: Number(weight_goal_in_kg),
  });

  const dateParsed = due_date && parse(due_date, "MM-dd-yyyy", new Date());
  const dueDateFormatted =
    dateParsed && format(new Date(dateParsed), "yyyy-MM-dd");
  const hasGoal = Boolean(weight_goal_in_kg || user?.weight_goal.due_date);

  const {
    control,
    formState,
    getValues,
    handleSubmit,
    trigger,
    register,
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      goalSelected: goal || null,
      weight_goal: {
        created_at: null,
        due_date: dueDateFormatted || null,
        weight_goal_in_kg: weightGoalFormatted || null,
      },
    },
    resolver: yupResolver(schema),
  });

  watch();

  const { errors, isSubmitting } = formState;
  const values = getValues();

  const handleSelect = (event: React.MouseEvent) => {
    event.preventDefault();
    const name = (event.target as HTMLButtonElement).name;
    const value = (event.target as HTMLButtonElement).value;
    if (
      Object.values(UserGoals).includes(value as UserGoals) &&
      name === "goalSelected"
    ) {
      setValue(name, value as UserGoals, {
        shouldDirty: true,
        shouldTouch: true,
      });
      trigger(name);
    }
  };

  const handleRemoveWeightGoal = (event: React.MouseEvent) => {
    event.preventDefault();
    setValue("weight_goal.due_date", null);
    setValue("weight_goal.weight_goal_in_kg", null);
  };

  const onSubmit = async (data: FormValues) => {
    if (isSubmitting) return;
    const { weight_goal } = data;
    const { weight_goal_in_kg } = weight_goal;

    // format Date if exists
    let date = weight_goal.due_date;
    if (date) {
      const dateParsed = parse(date, "yyyy-MM-dd", new Date());
      date = formatToUSDate(dateParsed);
    }

    const weightInKg = getWeightInKg({
      from: measurement_unit,
      weight: Number(weight_goal_in_kg),
    });

    const userUpdated: UserAccount = {
      ...user,
      goal: data.goalSelected,
      weight_goal: {
        ...weight_goal,
        created_at: formatISO(new Date()),
        weight_goal_in_kg: weightInKg,
        due_date: date,
      },
    };
    const res = await updateUser(userUpdated);
    if (res.result === "success") {
      dispatch(setUpdateUser(userUpdated));
      handleContinue();
      if (!isCreatingRoute) {
        toast.success("Your Goal has been updated successfully.");
      }
    } else {
      toast.error("Error updating your Goal");
    }
  };

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (
      values.goalSelected === user.goal &&
      values.weight_goal.weight_goal_in_kg === weightGoalFormatted &&
      values.weight_goal.due_date === dueDateFormatted
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [setIsDisabled, values, watch]);

  return (
    <section className="flex h-full w-full max-w-3xl flex-col items-center justify-center gap-3 rounded-md border bg-white/90 text-xs dark:bg-black/50 s:text-sm sm:text-base">
      <DevTool control={control} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex w-full flex-col gap-5"
      >
        <div className="flex flex-col gap-10 p-5">
          <div className="flex items-center gap-2">
            <span className="material-icons text-green-500">emoji_events</span>
            <span className="w-full text-left text-xl font-semibold sm:text-3xl">
              {isCreatingRoute ? "Select my Goal" : "Goal"}
            </span>
          </div>
          <div className="flex w-full flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-wrap items-center justify-center gap-2">
              {Object.values(UserGoals).map((goal) => (
                <button
                  onClick={handleSelect}
                  name={"goalSelected"}
                  className={`flex w-full min-w-fit items-center justify-center rounded-lg border bg-gray-500/20 px-3 py-2 text-xl font-medium duration-100 hover:border-green-700 hover:bg-green-500 hover:text-white active:border-black/10 active:bg-slate-500/30 dark:active:border-white/10 sm:basis-1/4 sm:text-2xl ${
                    goal === values.goalSelected
                      ? "border-green-700 bg-green-500 text-white"
                      : "text-gray-500"
                  }`}
                  key={goal}
                  value={goal}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-sm flex-col justify-center">
            <Collapsable
              defaultState={hasGoal}
              showed={
                <span className="text-xl font-semibold">
                  Add a weight goal (optional)
                </span>
              }
              hidden={
                <div className="flex w-full max-w-sm flex-col items-center justify-center gap-2 py-4">
                  <div className="relative flex w-full items-center justify-between gap-2 ">
                    <label>Weight Goal: </label>
                    <>
                      <span className="absolute right-2 select-none">
                        {getWeightUnit({ from: measurement_unit })}
                      </span>
                      <input
                        className="w-24 rounded-md border bg-transparent px-3 py-1.5"
                        type="number"
                        placeholder={getWeightUnit({ from: measurement_unit })}
                        {...register("weight_goal.weight_goal_in_kg", {
                          valueAsNumber: true,
                        })}
                      />
                    </>
                  </div>
                  <div className="flex w-full items-center justify-between gap-2 ">
                    <label>Due date: </label>
                    <input
                      className="rounded-md border bg-transparent px-3 py-1.5"
                      type="date"
                      {...register("weight_goal.due_date")}
                    />
                  </div>
                </div>
              }
            />
            <div>
              {hasGoal && (
                <button
                  className="mx-auto mt-2 flex items-center justify-center rounded-md border border-red-500 px-2 py-1 text-red-500 duration-300 hover:bg-slate-500/20"
                  onClick={handleRemoveWeightGoal}
                >
                  Remove Weight Goal
                </button>
              )}
            </div>
          </div>
          <InfoMessage message="Your Goal has an impact in your daily macronutrients." />
        </div>
        <div className="flex items-center justify-center border-t p-5">
          <FormError message={errors.goalSelected?.message} />
          <div className="ml-auto flex">
            <SubmitButton
              className={"m-auto h-9 w-24"}
              loadMessage={"Loading..."}
              content={`${isCreatingRoute ? "Continue" : "Save"}`}
              isLoading={isSubmitting}
              isDisabled={isSubmitting || isDisabled}
            />
          </div>
        </div>
      </form>
      <style jsx>
        {`
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"] {
            -webkit-appearance: none;
            margin: 0;
            -moz-appearance: textfield !important;
          }
        `}
      </style>
    </section>
  );
};

export default Goal;
