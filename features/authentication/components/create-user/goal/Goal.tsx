import SubmitButton from "@/components/Buttons/SubmitButton";
import FormError from "@/components/Errors/FormError";
import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import InfoMessage from "@/components/Layout/InfoMessage";
import {
  UserGoals,
  UserGoalsT,
  WeightGoal,
  getNutritionTargets,
  selectAuthSlice,
  useUpdateUserMutation,
} from "@/features/authentication";
import { calculateKCALSRecommended } from "@/features/authentication/utils/calculateBodyData";
import { AppRoutes, formatToInputDate, formatToUSDate } from "@/utils";
import {
  getWeight,
  getWeightAndText,
  getWeightInKg,
  getWeightUnit,
} from "@/utils/calculations";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { format, formatISO, parse } from "date-fns";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { MdEmojiEvents } from "react-icons/md";
import { useSelector } from "react-redux";
import WeightGoalInfo from "./WeightGoalInfo";
import { schema } from "./schema";

interface FormValues {
  goalSelected: UserGoalsT | null;
  weightGoal: WeightGoal;
}

interface Props {
  handleContinue: Function;
}

const Goal: FC<Props> = ({ handleContinue }) => {
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const isCreatingRoute = router.asPath === AppRoutes.create_user;
  const [isDisabled, setIsDisabled] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    register("goalSelected");
  }, []);

  if (!user) return <></>;

  const {
    measurementUnit,
    goal,
    weightGoal,
    bodyData,
    planSelected,
    nutritionTargets,
  } = user;
  const { weightGoalInKg, dueDate } = weightGoal;
  const { BMR, activity, weightInKg } = bodyData;

  const unitSelected = measurementUnit === "metric" ? "kgs" : "lbs";

  const weightGoalFormatted = getWeight({
    to: unitSelected,
    weight: Number(weightGoalInKg),
  });
  const { weight, weightText } = getWeightAndText({
    to: unitSelected,
    weightInKg: Number(weightInKg),
  });

  const dateParsed = dueDate && parse(dueDate, "MM-dd-yyyy", new Date());
  const dueDateFormatted =
    dateParsed && format(new Date(dateParsed), "yyyy-MM-dd");

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
      weightGoal: {
        createdAt: null,
        dueDate: dueDateFormatted || null,
        weightGoalInKg: weightGoalFormatted || null,
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
      Object.values(UserGoals).includes(value as UserGoalsT) &&
      name === "goalSelected"
    ) {
      setValue(name, value as UserGoalsT, {
        shouldDirty: true,
        shouldTouch: true,
      });
      trigger(name);
    }
    if (value === UserGoals.maintain) {
      handleRemoveWeightGoal(event);
    }
  };

  const [addWeightGoal, setAddWeightGoal] = useState(
    Boolean(values.weightGoal.weightGoalInKg || values.weightGoal.dueDate)
  );

  const handleRemoveWeightGoal = (event: React.MouseEvent) => {
    event.preventDefault();
    setValue("weightGoal.dueDate", null);
    setValue("weightGoal.weightGoalInKg", null);
    setAddWeightGoal(false);
  };

  const onSubmit = async (data: FormValues) => {
    if (isSubmitting) return;
    const { weightGoal, goalSelected } = data;
    const { weightGoalInKg } = weightGoal;

    try {
      if (!activity || !BMR || !goalSelected) throw new Error("Missing data");

      // format Date if exists
      let date = weightGoal.dueDate;
      if (date) {
        const dateParsed = parse(date, "yyyy-MM-dd", new Date());
        date = formatToUSDate(dateParsed);
      }

      const weightInKg = getWeightInKg({
        from: unitSelected,
        weight: Number(weightGoalInKg),
      });

      const calories = calculateKCALSRecommended({
        activity: activity,
        BMR: BMR,
        goal: goalSelected,
      });

      let newNutritionTargets = nutritionTargets;

      // if plan selected and not creating route, update nutrition targets
      if (planSelected && !isCreatingRoute) {
        newNutritionTargets = getNutritionTargets({
          calories: calories,
          planSelected: planSelected,
        });
      }

      const fields = {
        goal: goalSelected,
        weightGoal: {
          ...weightGoal,
          createdAt: formatISO(new Date()),
          weightGoalInKg: weightInKg,
          dueDate: date,
        },
        nutritionTargets: newNutritionTargets,
      };
      const res = await updateUser({ user, fields });
      if (!("error" in res)) {
        handleContinue();
        if (!isCreatingRoute) {
          toast.success("Your Goal has been updated successfully.");
        }
      } else {
        throw new Error("Error updating your Goal");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unexpected Error");
    } finally {
    }
  };

  useEffect(() => {
    if (
      !isCreatingRoute &&
      values.goalSelected === user.goal &&
      values.weightGoal.weightGoalInKg === weightGoalFormatted &&
      values.weightGoal.dueDate === dueDateFormatted
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [setIsDisabled, values, watch]);

  const today = formatToInputDate(new Date());

  return (
    <Box id="tour-profile_goal-0" customClass="max-w-2xl">
      <DevTool control={control} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex w-full flex-col gap-5"
      >
        <BoxMainContent customClass="flex-col gap-10">
          <div className="flex items-center gap-2">
            <MdEmojiEvents className="h-6 w-6 text-green-500" />
            <span className="w-full text-left text-xl font-semibold sm:text-3xl">
              {isCreatingRoute ? "Select my Goal" : "Goal"}
            </span>
          </div>

          <div className="flex w-full flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-wrap items-center justify-center gap-2">
              {Object.values(UserGoals).map((goal, index) => (
                <button
                  id={`tour-profile_goal-${index + 1}`}
                  onClick={handleSelect}
                  name={"goalSelected"}
                  className={`flex w-full min-w-fit items-center justify-center rounded-lg border bg-gray-500/20 px-3 py-2 text-xl font-medium capitalize duration-100 hover:border-green-700 hover:bg-green-500 hover:text-white active:border-black/10 active:bg-slate-500/30 dark:active:border-white/10 sm:basis-1/4 sm:text-2xl ${
                    goal === values.goalSelected
                      ? "border-green-700 bg-green-500 text-white"
                      : "text-gray-500"
                  }`}
                  key={goal}
                  value={goal}
                >
                  {goal === UserGoals.lose_weight
                    ? "Lose Fat"
                    : goal.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>
          <div className="m-auto">
            Current weight: {weight} {weightText}
          </div>
          {addWeightGoal ? (
            <div className="mx-auto flex w-full max-w-sm flex-col justify-center rounded-md border p-4">
              <div className="flex w-full max-w-sm flex-col items-center justify-center gap-2 ">
                <div className="relative flex w-full items-center justify-between gap-2 ">
                  <label>Weight Goal: </label>
                  <>
                    <span className="absolute right-2 select-none">
                      {getWeightUnit({ from: unitSelected })}
                    </span>
                    <input
                      className="w-24 rounded-md border bg-transparent px-3 py-1.5"
                      type="number"
                      min={
                        values.goalSelected === "build_muscle"
                          ? weight
                          : undefined
                      }
                      max={
                        values.goalSelected === "lose_weight"
                          ? weight
                          : undefined
                      }
                      step={0.1}
                      placeholder={getWeightUnit({
                        from: unitSelected,
                      })}
                      {...register("weightGoal.weightGoalInKg", {
                        valueAsNumber: true,
                      })}
                    />
                  </>
                </div>
                <div className="flex w-full items-center justify-between gap-2 ">
                  <label>To be achieved by: </label>
                  <input
                    className="rounded-md border bg-transparent px-3 py-1.5"
                    type="date"
                    min={today}
                    {...register("weightGoal.dueDate")}
                  />
                </div>
              </div>
              <button
                className="mx-auto mt-2 flex items-center justify-center rounded-md border border-red-500 px-2 py-1.5 text-red-500 duration-300 hover:bg-slate-500/20"
                onClick={handleRemoveWeightGoal}
              >
                Remove Weight Goal
              </button>
            </div>
          ) : (
            <>
              {values.goalSelected &&
                values.goalSelected !== UserGoals.maintain && (
                  <button
                    id="tour-profile_goal-4"
                    className="mx-auto mt-2 flex items-center justify-center rounded-md border border-green-500 px-2 py-1.5 text-green-500 duration-300 hover:bg-slate-500/20"
                    onClick={() => setAddWeightGoal(true)}
                  >
                    Add Weight Goal (optional)
                  </button>
                )}
            </>
          )}
          <div id="tour-profile_goal-5">
            {addWeightGoal && (
              <WeightGoalInfo
                currentWeight={weight}
                dueDate={values.weightGoal.dueDate}
                measurementUnit={measurementUnit}
                weightGoalInKg={values.weightGoal.weightGoalInKg}
              />
            )}
          </div>
          <InfoMessage message="Your Goal has an impact in your daily macronutrients." />
        </BoxMainContent>
        <BoxBottomBar>
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
        </BoxBottomBar>
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
    </Box>
  );
};

export default Goal;
