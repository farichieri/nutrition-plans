import {
  ACTIVITY_OPTIONS,
  GENDER_OPTIONS,
  GOAL_OPTIONS,
} from "@/utils/formContents";
import { FC, useEffect, useState } from "react";
import { MeasurementUnits, UserAccount } from "@/types/types";
import { newBodyData } from "@/types/initialTypes";
import { selectAuthSlice, setUpdateUser } from "@/store/slices/authSlice";
import { updateUser } from "@/firebase/helpers/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { getNutritionTargets } from "./helpers";

interface Props {
  handleSubmit: Function;
}

const BodyFeatures: FC<Props> = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const body_data = user?.body_data || newBodyData;

  const router = useRouter();
  const isCreatingRoute = router.asPath === "/app/create";
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState("");
  const FEET_TO_CM = 30.48;
  const INCHES_TO_CM = 2.54;
  const KCALS_TO_GAIN = 500;
  const KCALS_TO_LOSE = -500;
  const LIB_TO_KG = 0.45359237;

  const cmsToFeet = (cm: number | null) => {
    let totalInches = Number(cm) / INCHES_TO_CM;
    let feet = Math.floor(Number(totalInches) / 12);
    return feet;
  };
  const cmsToInches = (cm: number | null) => {
    let totalInches = Number(cm) / INCHES_TO_CM;
    let feet = Math.floor(Number(totalInches) / 12);
    let inches = Math.round(totalInches - 12 * feet);
    return inches;
  };
  const kgsToLbs = (kgs: number | null) => {
    let pounds = Math.floor(Number(kgs) / LIB_TO_KG);
    return pounds;
  };

  const [input, setInput] = useState({
    activity: body_data.activity || "",
    age: body_data.age || "",
    centimeters: body_data.height_in_cm || "",
    feet: cmsToFeet(body_data.height_in_cm) || "",
    gender: body_data.gender || "",
    goal: body_data.goal || "",
    inches: cmsToInches(body_data.height_in_cm) || "",
    kilograms: body_data.weight_in_kg || "",
    measurement_unit: MeasurementUnits.imperial,
    pounds: kgsToLbs(body_data.weight_in_kg) || "",
  });

  const isMetricUnits = input.measurement_unit === MeasurementUnits.metric;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    if (name)
      setInput({
        ...input,
        [name]: value,
      });
    setError("");
  };

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const name = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;
    setInput({
      ...input,
      [name]: value,
    });
    setError("");
  };

  useEffect(() => {
    if (input.measurement_unit === MeasurementUnits.metric) {
      let pounds = kgsToLbs(Number(input.kilograms));
      let feet = cmsToFeet(Number(input.centimeters));
      let inches = cmsToInches(Number(input.centimeters));
      setInput({
        ...input,
        pounds: String(pounds),
        feet: String(feet),
        inches: String(inches),
      });
    }
  }, [input.centimeters, input.kilograms]);

  useEffect(() => {
    if (input.measurement_unit === MeasurementUnits.imperial) {
      let kilograms = Math.floor(Number(input.pounds) * LIB_TO_KG);
      let centimeters =
        Number(input.feet) * FEET_TO_CM + Number(input.inches) * INCHES_TO_CM;

      setInput({
        ...input,
        kilograms: String(kilograms),
        centimeters: String(centimeters),
      });
    }
  }, [input.pounds, input.feet, input.inches]);

  useEffect(() => {
    const userValues = {
      gender: body_data.gender,
      centimeters: body_data.height_in_cm,
      kilograms: body_data.weight_in_kg,
      age: body_data.age,
      activity: body_data.activity,
      goal: body_data.goal,
      measurement_unit: body_data.measurement_unit,
    };
    const formValues = {
      gender: input.gender,
      centimeters: Number(input.centimeters),
      kilograms: Number(input.kilograms),
      age: input.age,
      activity: input.activity,
      goal: input.goal,
      measurement_unit: input.measurement_unit,
    };
    if (
      JSON.stringify(userValues) !== JSON.stringify(formValues) ||
      (isCreatingRoute && !isFormIncomplete)
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [input, body_data]);

  const isFormIncomplete =
    !input.age ||
    !input.centimeters ||
    !input.gender ||
    !input.kilograms ||
    !input.activity ||
    !input.goal ||
    !input.measurement_unit;

  const calculateBMR = () => {
    const standard =
      10 * Number(input.kilograms) +
      6.25 * Number(input.centimeters) -
      5 * Number(input.age);
    return Number(input.gender === "male" ? standard + 5 : standard - 161);
  };

  const calculateKCALSRecommended = () => {
    const BMR = calculateBMR();
    const goalCalories =
      input.goal === GOAL_OPTIONS[0].value
        ? KCALS_TO_LOSE
        : input.goal === GOAL_OPTIONS[2].value
        ? KCALS_TO_GAIN
        : 0;
    return Math.round(Number(BMR) * Number(input.activity) + goalCalories);
  };

  const calculateBMI = () => {
    return (
      Number(input.kilograms) / Math.pow(Number(input.centimeters) / 100, 2)
    ).toFixed(2);
  };

  const kcals_recommended = Number(calculateKCALSRecommended());
  const BMI = Number(calculateBMI());
  const BMR = Number(calculateBMR());

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    if (isFormIncomplete) {
      setError("Complete all fields to continue");
    } else {
      setIsLoading(true);
      const planSelected = user.plan_selected;
      const nutritionTargets =
        planSelected && getNutritionTargets(kcals_recommended, planSelected);
      if (!nutritionTargets) return;
      const userUpdated: UserAccount = {
        ...user,
        body_data: {
          activity: Number(input.activity),
          age: Number(input.age),
          BMI: BMI,
          BMR: BMR,
          gender: String(input.gender),
          goal: String(input.goal),
          height_in_cm: Number(input.centimeters),
          kcals_recommended: kcals_recommended,
          measurement_unit: input.measurement_unit,
          weight_in_kg: Number(input.kilograms),
        },
        nutrition_targets: nutritionTargets,
      };
      const res = await updateUser(userUpdated);
      if (!res?.error) {
        dispatch(setUpdateUser(userUpdated));
        handleSubmit();
      } else {
        setError("Ups, something happened, please try again");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full max-w-xl flex-col items-center justify-center gap-3 rounded-md border bg-white text-xs dark:bg-black s:text-sm sm:text-base">
      <form
        action=""
        onSubmit={onSubmit}
        className="flex w-full max-w-xl flex-col gap-5"
      >
        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-center">
            <span className="material-icons text-green-500">
              settings_accessibility
            </span>
            <span className="w-full p-5 text-left text-3xl font-semibold">
              My Body features
            </span>
          </div>
          <div className="flex w-full max-w-xl flex-wrap">
            <label className="basis-1/5 font-semibold">Goal</label>
            <div className="mx-auto flex w-full basis-4/5 items-center justify-center gap-2">
              {GOAL_OPTIONS.map((opt) => (
                <button
                  onClick={handleClick}
                  className={`w-full min-w-max rounded-lg border bg-gray-300 px-2 py-1 text-xs font-semibold text-black shadow-[0_0_5px_gray] sm:text-base ${
                    input.goal === opt.value
                      ? "border-green-500 bg-green-500/70 text-white shadow-inner"
                      : "border-slate-400 bg-slate-300/50 text-black"
                  }`}
                  name="goal"
                  key={opt.value}
                  value={opt.value}
                >
                  {opt.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex w-full max-w-xl">
            <label className="basis-1/5 font-semibold">Units</label>
            <div className="flex w-full basis-4/5 justify-center">
              <div className="relative flex cursor-pointer rounded-3xl border-green-500 text-xs shadow-[0_0_5px_gray] sm:text-base">
                <div
                  className={`${
                    input.measurement_unit === MeasurementUnits.metric
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
            <div className="flex w-full max-w-xl flex-wrap">
              <label className="basis-1/5 font-semibold">Gender</label>
              <div className="mx-auto flex w-full basis-4/5 items-center justify-center gap-2">
                {GENDER_OPTIONS.map((opt) => (
                  <button
                    onClick={handleClick}
                    className={`w-full rounded-lg border px-2 py-1 text-xs font-semibold shadow-[0_0_5px_gray] sm:text-base ${
                      input.gender === opt.value
                        ? "border-green-500 bg-green-500/70 text-white"
                        : "border-slate-400 bg-slate-300/50 text-black"
                    }`}
                    key={opt.value}
                    name="gender"
                    value={opt.value}
                  >
                    {opt.name}
                  </button>
                ))}
              </div>
            </div>
            {isMetricUnits ? (
              <>
                <div className="relative flex max-w-xl items-center justify-between gap-1">
                  <label
                    className="basis-1/5 font-semibold"
                    htmlFor="centimeters"
                  >
                    Height
                  </label>
                  <span className="absolute right-2 select-none">cm</span>
                  <input
                    type="text"
                    name="centimeters"
                    id="centimeters"
                    placeholder="Centimeters"
                    onChange={handleChange}
                    value={input.centimeters}
                    className="flex w-full basis-4/5"
                  />
                </div>
                <div className="relative flex max-w-xl items-center justify-between gap-1 ">
                  <label
                    className="basis-1/5 font-semibold"
                    htmlFor="kilograms"
                  >
                    Weight
                  </label>
                  <span className="absolute right-2 select-none">kg</span>
                  <input
                    type="text"
                    name="kilograms"
                    placeholder="Kilograms"
                    onChange={handleChange}
                    value={input.kilograms}
                    className="flex w-full basis-4/5"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="relative flex max-w-xl items-center justify-between gap-1 ">
                  <label htmlFor="feet" className="basis-1/5 font-semibold">
                    Height
                  </label>
                  <div className="flex w-min basis-4/5 items-center gap-1">
                    <div className="relative flex w-full items-center">
                      <span className="absolute right-2 select-none">ft</span>
                      <input
                        type="text"
                        name="feet"
                        id="feet"
                        placeholder="Feet"
                        onChange={handleChange}
                        value={input.feet}
                        className="flex w-full"
                      />
                    </div>
                    <div className="relative flex w-full items-center ">
                      <span className="absolute right-2 select-none">in</span>
                      <input
                        type="text"
                        name="inches"
                        placeholder="Inches"
                        onChange={handleChange}
                        value={input.inches}
                        className="flex w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative flex max-w-xl items-center justify-between gap-1 ">
                  <label htmlFor="pounds" className="basis-1/5 font-semibold">
                    Weight
                  </label>
                  <span className="absolute right-2 select-none">lbs</span>
                  <input
                    type="text"
                    name="pounds"
                    id="pounds"
                    placeholder="Pounds"
                    onChange={handleChange}
                    value={input.pounds}
                    className="flex w-full basis-4/5"
                  />
                </div>
              </>
            )}
            <div className="relative flex items-center justify-between gap-1">
              <label className="basis-1/5 font-semibold" htmlFor="age">
                Age
              </label>
              <span className="absolute right-2 select-none">years</span>
              <input
                type="text"
                name="age"
                required
                placeholder="Years"
                onChange={handleChange}
                value={input.age}
                className="flex w-full basis-4/5"
              />
            </div>
            <div className="flex items-center justify-between gap-1">
              <label className="basis-1/5 font-semibold" htmlFor="activity">
                Activity
              </label>

              <select
                name={"activity"}
                id={"activity"}
                required={true}
                className="flex w-full basis-4/5"
                onChange={handleChange}
                value={input.activity ? input.activity : "none"}
              >
                <option value="none" disabled hidden>
                  Select
                </option>
                {ACTIVITY_OPTIONS.map((act) => (
                  <option
                    key={act.value}
                    value={act.value}
                    className=" dark:bg-slate-500"
                  >
                    {act.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center border-t p-5">
          {error && (
            <span className="text-center font-medium text-red-400">
              {error}
            </span>
          )}
          <div className="ml-auto flex">
            <SubmitButton
              className={"m-auto h-9 w-24"}
              onSubmit={onSubmit}
              loadMessage={"Loading..."}
              content={`${isCreatingRoute ? "Continue" : "Save"}`}
              isLoading={isLoading}
              isDisabled={isFormIncomplete || isDisabled}
            />
          </div>
        </div>
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
        `}
      </style>
    </div>
  );
};

export default BodyFeatures;
