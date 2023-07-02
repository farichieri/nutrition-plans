import {
  UserAccount,
  UserActivities,
  UserGenders,
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
  gender: UserGenders | null;
  inches: number | null;
  kilograms: number | null;
  measurement_unit: MeasurementUnits;
  pounds: number | null;
}

interface Props {
  handleContinue: Function;
}

const BodyFeatures: FC<Props> = ({ handleContinue }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const body_data = user?.body_data || newBodyData;

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
      activity: body_data.activity,
      age: body_data.age,
      centimeters: body_data.height_in_cm,
      feet: cmsToFeet({ cms: Number(body_data.height_in_cm) }) || null,
      gender: body_data.gender,
      inches: cmsToInches({ cms: Number(body_data.height_in_cm) }) || null,
      kilograms: body_data.weight_in_kg,
      measurement_unit: user?.measurement_unit || MeasurementUnits.imperial,
      pounds: kgsToLbs({ kgs: Number(body_data.weight_in_kg) }) || null,
    },
    resolver: yupResolver(schema),
  });
  const { errors, isSubmitting } = formState;
  const values = getValues();

  const isCreatingRoute = router.asPath === AppRoutes.create_user;
  const [error, setError] = useState("");

  const watchMeasurementUnit = watch("measurement_unit");
  const isMetricUnits = watchMeasurementUnit === MeasurementUnits.metric;

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const name = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;
    if (
      name === "gender" &&
      Object.keys(UserGenders).includes(value as UserGenders)
    ) {
      setValue("gender", value as UserGenders);
      trigger("gender");
    } else if (
      name === "measurement_unit" &&
      Object.keys(MeasurementUnits).includes(value as MeasurementUnits)
    ) {
      setValue("measurement_unit", value as MeasurementUnits);
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
    const { activity, age, gender, centimeters, kilograms, measurement_unit } =
      data;

    if (!kilograms) return;

    const lts = getWater({
      weightInKg: kilograms,
      measurement: measurement_unit,
    });

    let userUpdated: UserAccount = {
      ...user,
      measurement_unit: measurement_unit,
      body_data: {
        ...body_data,
        activity: Number(activity),
        age: age,
        gender: gender,
        height_in_cm: centimeters,
        weight_in_kg: kilograms,
        water_lts_recommended: formatTwoDecimals(lts),
      },
    };

    const res = await updateUser(userUpdated);
    if (res.result === "success") {
      dispatch(setUpdateUser(userUpdated));
      handleContinue();
      if (!isCreatingRoute)
        toast.success("Your Body Features have been updated successfully.");
    } else {
      if (!isCreatingRoute) toast.error("Error updating your Body Features");
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
                      values.measurement_unit === MeasurementUnits.metric
                        ? "right-[50%]"
                        : "right-0"
                    } absolute h-full w-[50%] select-none rounded-3xl bg-green-500 transition-all duration-300`}
                  ></div>
                  {Object.keys(MeasurementUnits).map((type) => (
                    <button
                      key={type}
                      name="measurement_unit"
                      value={type}
                      onClick={handleClick}
                      className="z-20 w-28 rounded-3xl border-none px-4 py-1 text-xs font-semibold active:shadow-lg sm:text-base"
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
          {error && (
            <span className="text-center font-medium text-red-400">
              {error}
            </span>
          )}
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
