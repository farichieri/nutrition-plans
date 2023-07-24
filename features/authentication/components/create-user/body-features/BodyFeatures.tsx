import {
  User,
  UserActivities,
  UserGenders,
  UserGendersT,
  getWater,
  newBodyData,
  selectAuthSlice,
  setUpdateUser,
  updateUser,
} from "@/features/authentication";
import {
  cmsToFeet,
  cmsToInches,
  feetAndInchesToCMS,
  kgsToLbs,
  lbsToKgs,
} from "@/utils/calculations";
import { ACTIVITY_OPTIONS } from "@/constants";
import { DevTool } from "@hookform/devtools";
import { FC, useEffect, useState } from "react";
import { MeasurementUnits } from "@/types";
import { schema } from "./schema";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "@/components/Errors/FormError";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { toast } from "react-hot-toast";
import { AppRoutes, formatTwoDecimals } from "@/utils";
import { MdSettingsAccessibility } from "react-icons/md";
import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";

interface FormValues {
  activity: UserActivities | null;
  age: number | null;
  centimeters: number | null;
  feet: number | null;
  gender: UserGendersT | null;
  inches: number | null;
  kilograms: number | null;
  measurementUnit: MeasurementUnits;
  pounds: number | null;
}

interface Props {
  handleContinue: Function;
}

const BodyFeatures: FC<Props> = ({ handleContinue }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const bodyData = user?.bodyData || newBodyData;

  const {
    control,
    formState,
    getValues,
    handleSubmit,
    register,
    setValue,
    trigger,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      activity: bodyData.activity,
      age: bodyData.age,
      centimeters: bodyData.heightInCm,
      feet: cmsToFeet({ cms: Number(bodyData.heightInCm) }) || null,
      gender: bodyData.gender,
      inches: cmsToInches({ cms: Number(bodyData.heightInCm) }) || null,
      kilograms: bodyData.weightInKg,
      measurementUnit: user?.measurementUnit || MeasurementUnits.Imperial,
      pounds: kgsToLbs({ kgs: Number(bodyData.weightInKg) }) || null,
    },
    resolver: yupResolver(schema),
  });
  const { errors, isSubmitting } = formState;
  const values = getValues();

  const isCreatingRoute = router.asPath === AppRoutes.create_user;
  const [error, setError] = useState("");

  const watchMeasurementUnit = watch("measurementUnit");
  const isMetricUnits = watchMeasurementUnit === MeasurementUnits.Metric;

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const name = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;
    if (
      name === "gender" &&
      Object.keys(UserGenders).includes(value as UserGendersT)
    ) {
      setValue("gender", value as UserGendersT);
      trigger("gender");
    } else if (
      name === "measurementUnit" &&
      Object.values(MeasurementUnits).includes(value as MeasurementUnits)
    ) {
      console.log({ value });
      setValue("measurementUnit", value as MeasurementUnits);
    }
  };

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = Number(event.target.value);

    setValue(name, value);

    if (name === "centimeters" || name === "kilograms") {
      let kilograms;
      let centimeters;
      if (name === "centimeters") {
        centimeters = value;
        kilograms = values.kilograms;
        trigger(["feet", "inches"]);
      } else {
        centimeters = values.centimeters;
        kilograms = value;
        trigger(["pounds"]);
      }
      let pounds = kgsToLbs({ kgs: Number(kilograms) });
      let feet = cmsToFeet({ cms: Number(centimeters) });
      let inches = cmsToInches({ cms: Number(centimeters) });

      setValue("pounds", pounds, { shouldDirty: true, shouldTouch: true });
      setValue("feet", feet, { shouldDirty: true, shouldTouch: true });
      setValue("inches", inches, { shouldDirty: true, shouldTouch: true });
    }
    if (name === "pounds" || name === "feet" || name === "inches") {
      let pounds;
      let feet;
      let inches;

      if (name === "pounds") {
        pounds = value;
        feet = values.feet;
        inches = values.inches;
        trigger(["kilograms"]);
      } else if (name === "feet") {
        pounds = values.pounds;
        feet = value;
        inches = values.inches;
        trigger(["centimeters"]);
      } else {
        pounds = values.pounds;
        feet = values.feet;
        inches = value;
        trigger(["centimeters"]);
      }
      let kilograms = lbsToKgs({ pounds: Number(pounds) });
      let centimeters = feetAndInchesToCMS({
        feet: Number(feet),
        inches: Number(inches),
      });
      setValue("kilograms", kilograms, {
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue("centimeters", centimeters, {
        shouldDirty: true,
        shouldTouch: true,
      });
    }
    trigger(name);
  };

  useEffect(() => {
    register("pounds");
    register("feet");
    register("inches");
    register("centimeters");
    register("kilograms");
  }, []);

  const onSubmit = async (data: FormValues) => {
    if (!user || isSubmitting) return;
    const { activity, age, gender, centimeters, kilograms, measurementUnit } =
      data;

    if (!kilograms) return;

    const lts = getWater({
      weightInKg: kilograms,
      measurement: measurementUnit,
    });

    const fields = {
      measurementUnit: measurementUnit,
      bodyData: {
        ...bodyData,
        activity: Number(activity),
        age: age,
        gender: gender,
        heightInCm: centimeters,
        weightInKg: kilograms,
        waterRecommendedInLts: formatTwoDecimals(lts),
      },
    };

    const res = await updateUser({ user, fields });
    if (res.result === "success") {
      dispatch(setUpdateUser({ user, fields }));
      handleContinue();
      if (!isCreatingRoute)
        toast.success("Your Body Features have been updated successfully.");
    } else {
      if (!isCreatingRoute) {
        toast.error("Error updating your Body Features");
      } else {
        setError("Unexpected Error");
      }
    }
  };

  const [isDisabled, setIsDisabled] = useState(false);

  // useEffect(() => {
  //   if (
  //     values.goalSelected === user.goal &&
  //     values.weight_goal.weight_goal_in_kg === weightGoalFormatted &&
  //     values.weight_goal.due_date === dueDateFormatted
  //   ) {
  //     setIsDisabled(true);
  //   } else {
  //     setIsDisabled(false);
  //   }
  // }, [setIsDisabled, values, watch]);

  return (
    <Box customClass="max-w-xl">
      <DevTool control={control} />
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5"
      >
        <BoxMainContent customClass="flex-col gap-10">
          <div className="flex items-center gap-2">
            <MdSettingsAccessibility className="h-6 w-6 text-green-500" />
            <span className="w-full text-left text-xl font-semibold sm:text-3xl">
              My Body features
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex w-full max-w-xl">
              <label className="basis-1/5 font-semibold">Units</label>
              <div className="flex w-full basis-4/5 justify-center">
                <div className="relative flex cursor-pointer rounded-3xl border-green-500 text-xs shadow-[0_0_5px_gray] sm:text-base">
                  <div
                    className={`${
                      values.measurementUnit === MeasurementUnits.Metric
                        ? "right-[50%]"
                        : "right-0"
                    } absolute h-full w-[50%] select-none rounded-3xl bg-green-500 transition-all duration-300`}
                  ></div>
                  {Object.values(MeasurementUnits).map((type) => (
                    <button
                      key={type}
                      name="measurementUnit"
                      value={type}
                      onClick={handleClick}
                      className="z-20 w-28 rounded-3xl border-none px-4 py-1 text-xs font-semibold capitalize active:shadow-lg sm:text-base"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex w-full max-w-xl flex-wrap justify-center">
                <label className="basis-1/5 font-semibold">Gender</label>
                <div className="mx-auto flex w-full basis-4/5 items-center justify-center gap-2">
                  {Object.keys(UserGenders).map((gender) => (
                    <button
                      onClick={handleClick}
                      className={`w-full rounded-lg border px-2 py-1 text-xs font-semibold shadow-[0_0_5px_gray] sm:text-base ${
                        values.gender === gender
                          ? "border-green-500 bg-green-500/70 text-white"
                          : "border-slate-400 bg-slate-300/50 text-black"
                      }`}
                      key={gender}
                      name="gender"
                      value={gender}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
                <FormError message={errors.gender?.message} />
              </div>
              {isMetricUnits ? (
                <>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative flex w-full max-w-xl items-center justify-between gap-1">
                      <label
                        className="basis-1/5 font-semibold"
                        htmlFor="centimeters"
                      >
                        Height
                      </label>
                      <span className="absolute right-2 select-none">cm</span>
                      <input
                        className="flex w-full basis-4/5"
                        id="centimeters"
                        placeholder="Centimeters"
                        type="number"
                        name="centimeters"
                        onChange={handleChange}
                        value={values.centimeters || ""}
                      />
                    </div>
                    <FormError message={errors.centimeters?.message} />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative flex w-full max-w-xl items-center justify-between gap-1">
                      <label
                        className="basis-1/5 font-semibold"
                        htmlFor="kilograms"
                      >
                        Weight
                      </label>
                      <span className="absolute right-2 select-none">kg</span>
                      <input
                        className="flex w-full basis-4/5"
                        placeholder="Kilograms"
                        type="number"
                        name="kilograms"
                        onChange={handleChange}
                        value={values.kilograms || ""}
                      />
                    </div>
                    <FormError message={errors.kilograms?.message} />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative flex w-full max-w-xl items-center justify-between gap-1">
                      <label htmlFor="feet" className="basis-1/5 font-semibold">
                        Height
                      </label>
                      <div className="flex w-min basis-4/5 items-center gap-1">
                        <div className="relative flex w-full items-center">
                          <span className="absolute right-2 select-none">
                            ft
                          </span>
                          <input
                            className="flex w-full"
                            placeholder="Feet"
                            type="number"
                            name="feet"
                            onChange={handleChange}
                            value={values.feet || ""}
                          />
                        </div>
                        <div className="relative flex w-full items-center ">
                          <span className="absolute right-2 select-none">
                            in
                          </span>
                          <input
                            className="flex w-full"
                            placeholder="Inches"
                            type="number"
                            name="inches"
                            onChange={handleChange}
                            value={values.inches || ""}
                          />
                        </div>
                      </div>
                    </div>
                    <FormError message={errors.feet?.message} />
                    <FormError message={errors.inches?.message} />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative flex w-full max-w-xl items-center justify-between gap-1">
                      <label
                        htmlFor="pounds"
                        className="basis-1/5 font-semibold"
                      >
                        Weight
                      </label>
                      <span className="absolute right-2 select-none">lbs</span>
                      <input
                        className="flex w-full basis-4/5"
                        placeholder="Pounds"
                        type="number"
                        name="pounds"
                        onChange={handleChange}
                        value={values.pounds || ""}
                      />
                    </div>
                    <FormError message={errors.pounds?.message} />
                  </div>
                </>
              )}
              <div className="flex flex-col items-center justify-center">
                <div className="relative flex w-full items-center justify-between gap-1">
                  <label className="basis-1/5 font-semibold" htmlFor="age">
                    Age
                  </label>
                  <span className="absolute right-2 select-none">years</span>
                  <input
                    type="number"
                    required
                    placeholder="Years"
                    className="flex w-full basis-4/5"
                    {...register("age", { valueAsNumber: true })}
                  />
                </div>
                <FormError message={errors.age?.message} />
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="relative flex w-full items-center justify-between gap-1">
                  <label className="basis-1/5 font-semibold" htmlFor="activity">
                    Activity
                  </label>
                  <select
                    required={true}
                    className="flex w-full basis-4/5"
                    defaultValue=""
                    {...register("activity", { valueAsNumber: true })}
                  >
                    <option value="" disabled hidden>
                      Select
                    </option>
                    {ACTIVITY_OPTIONS.map((act) => (
                      <option
                        key={act.value}
                        value={Number(act.value)}
                        className=" dark:bg-slate-500"
                      >
                        {act.name}
                      </option>
                    ))}
                  </select>
                </div>
                <FormError message={errors.activity?.message} />
              </div>
            </div>
          </div>
        </BoxMainContent>
        <BoxBottomBar>
          {error && <FormError message={error} />}
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
          input,
          select {
            color: inherit;
            background: none;
            border: 1px solid gray;
            border-radius: 5px;
            padding: 5px 10px;
          }
          select > option {
            background: lightgray;
            color: black;
          }
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

export default BodyFeatures;
