import {
  UserAccount,
  UserGoals,
  WeightGoal,
  selectAuthSlice,
  setUpdateUser,
  updateUser,
} from "@/features/authentication";
import { DevTool } from "@hookform/devtools";
import { FC, useEffect } from "react";
import { formatISO, parse } from "date-fns";
import { getWeightInKg, lbsToKgs } from "@/utils/calculations";
import { MeasurementUnits, WeightUnits } from "@/types";
import { schema } from "./schema";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import Collapsable from "@/components/Layout/Collapsable";
import FormError from "@/components/Errors/FormError";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { formatToUSDate } from "@/utils";

interface FormValues {
  goalSelected: UserGoals | null;
  weight_goal: WeightGoal;
}

interface Props {
  handleContinue: Function;
}

const Goal: FC<Props> = ({ handleContinue }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();
  const measurement_unit = user?.measurement_unit;
  const isImperial = measurement_unit === MeasurementUnits.imperial;
  const weightGoalInKg = isImperial
    ? getWeightInKg({
        from: MeasurementUnits.imperial,
        weight: Number(user?.weight_goal.weight_goal_in_kg),
      })
    : user?.weight_goal.weight_goal_in_kg;
  const hasGoal = Boolean(
    user?.weight_goal.weight_goal_in_kg || user?.weight_goal.due_date
  );
  const isCreatingRoute = router.asPath === "/app/create";

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
      goalSelected: user?.goal || null,
      weight_goal: {
        created_at: null,
        due_date: user?.weight_goal.due_date || null,
        weight_goal_in_kg: weightGoalInKg || null,
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
    if (!user || isSubmitting) return;
    const { weight_goal } = data;
    const { weight_goal_in_kg } = weight_goal;

    let weightInKg = weight_goal_in_kg;
    if (isImperial) {
      weightInKg = lbsToKgs({
        pounds: Number(weight_goal_in_kg),
      });
    }

    // format Date if exists
    let date = weight_goal.due_date;
    if (date) {
      const dateParsed = parse(date, "yyyy-MM-dd", new Date());
      date = formatToUSDate(dateParsed);
    }

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
    }
  };

  useEffect(() => {
    register("goalSelected");
  }, []);

  return (
    <section className="flex h-full w-full max-w-3xl flex-col items-center justify-center gap-3 rounded-md border bg-white text-xs dark:bg-black s:text-sm sm:text-base">
      <DevTool control={control} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex w-full flex-col gap-5"
      >
        <div className="flex flex-col gap-10 p-5">
          <div className="flex items-center gap-2">
            <span className="material-icons text-green-500 ">emoji_events</span>
            <span className="w-full text-left text-xl font-semibold sm:text-3xl">
              Select my Goal
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
                    {!isImperial ? (
                      <>
                        <span className="absolute right-2 select-none">
                          {WeightUnits.kgs}
                        </span>
                        <input
                          className="w-24 rounded-md border bg-transparent px-3 py-1.5"
                          type="number"
                          placeholder="kgs"
                          {...register("weight_goal.weight_goal_in_kg")}
                        />
                      </>
                    ) : (
                      <>
                        <span className="absolute right-2 select-none">
                          {WeightUnits.lbs}
                        </span>
                        <input
                          className="w-24 rounded-md border bg-transparent px-3 py-1.5"
                          placeholder="lbs"
                          type="number"
                          {...register("weight_goal.weight_goal_in_kg")}
                        />
                      </>
                    )}
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
              {(values.weight_goal.weight_goal_in_kg ||
                values.weight_goal.due_date) && (
                <button
                  className="mx-auto mt-2 flex items-center justify-center rounded-md border border-red-500 px-2 py-1 text-red-500 duration-300 hover:bg-slate-500/20"
                  onClick={handleRemoveWeightGoal}
                >
                  Remove Weight Goal
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center border-t p-5">
          <FormError message={errors.goalSelected?.message} />
          <div className="ml-auto flex">
            <SubmitButton
              className={"m-auto h-9 w-24"}
              loadMessage={"Loading..."}
              content={`${isCreatingRoute ? "Continue" : "Save"}`}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
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
