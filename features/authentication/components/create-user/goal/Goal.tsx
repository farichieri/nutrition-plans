import {
  User,
  UserGoals,
  WeightGoal,
  selectAuthSlice,
  setUpdateUser,
  updateUser,
} from "@/features/authentication";
import { AppRoutes, formatToUSDate } from "@/utils";
import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import { DevTool } from "@hookform/devtools";
import { FC, useEffect, useState } from "react";
import { format, formatISO, parse } from "date-fns";
import { getWeight, getWeightInKg, getWeightUnit } from "@/utils/calculations";
import { MdEmojiEvents } from "react-icons/md";
import { schema } from "./schema";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import Collapsable from "@/components/Layout/Collapsable";
import FormError from "@/components/Errors/FormError";
import InfoMessage from "@/components/Layout/InfoMessage";
import SubmitButton from "@/components/Buttons/SubmitButton";

interface FormValues {
  goalSelected: UserGoals | null;
  weightGoal: WeightGoal;
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

  const { measurementUnit, goal, weightGoal } = user;
  const { weightGoalInKg, dueDate } = weightGoal;

  const weightGoalFormatted = getWeight({
    to: measurementUnit,
    weight: Number(weightGoalInKg),
  });

  const dateParsed = dueDate && parse(dueDate, "MM-dd-yyyy", new Date());
  const dueDateFormatted =
    dateParsed && format(new Date(dateParsed), "yyyy-MM-dd");
  const hasGoal = Boolean(weightGoalInKg || user?.weightGoal.dueDate);

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
    setValue("weightGoal.dueDate", null);
    setValue("weightGoal.weightGoalInKg", null);
  };

  const onSubmit = async (data: FormValues) => {
    if (isSubmitting) return;
    const { weightGoal: weightGoal } = data;
    const { weightGoalInKg: weightGoalInKg } = weightGoal;

    // format Date if exists
    let date = weightGoal.dueDate;
    if (date) {
      const dateParsed = parse(date, "yyyy-MM-dd", new Date());
      date = formatToUSDate(dateParsed);
    }

    const weightInKg = getWeightInKg({
      from: measurementUnit,
      weight: Number(weightGoalInKg),
    });
    const fields = {
      goal: data.goalSelected,
      weightGoal: {
        ...weightGoal,
        createdAt: formatISO(new Date()),
        weightGoalInKg: weightInKg,
        dueDate: date,
      },
    };
    const res = await updateUser({ user, fields });
    if (res.result === "success") {
      dispatch(setUpdateUser({ user, fields }));
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
      values.weightGoal.weightGoalInKg === weightGoalFormatted &&
      values.weightGoal.dueDate === dueDateFormatted
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [setIsDisabled, values, watch]);

  return (
    <Box customClass="max-w-2xl">
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
                        {getWeightUnit({ from: measurementUnit })}
                      </span>
                      <input
                        className="w-24 rounded-md border bg-transparent px-3 py-1.5"
                        type="number"
                        placeholder={getWeightUnit({
                          from: measurementUnit,
                        })}
                        {...register("weightGoal.weightGoalInKg", {
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
                      {...register("weightGoal.dueDate")}
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
