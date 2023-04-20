import SubmitButton from "@/components/Buttons/SubmitButton";
import { updateUser } from "@/firebase/helpers/Auth";
import { selectAuthSlice, setUpdateUser } from "@/store/slices/authSlice";
import { UserAccount } from "@/types/types";
import {
  ACTIVITY_OPTIONS,
  GENDER_OPTIONS,
  GOAL_OPTIONS,
} from "@/utils/formContents";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  handleSubmit: Function;
}

const BodyFeatures: FC<Props> = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();
  const isCreatingRoute = router.asPath === "/app/create";

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState("");
  const FEET_TO_CM = 30.48;
  const INCHES_TO_CM = 2.54;
  const LIB_TO_KG = 0.45359237;
  const KCALS_TO_GAIN = 500;
  const KCALS_TO_LOSE = -500;
  const CALCULATOR_TYPES: any = {
    metric: "metric",
    imperial: "imperial",
  };
  const [calculatorType, setCalculatorType] = useState(CALCULATOR_TYPES.metric);
  const isMetricUnits = calculatorType === CALCULATOR_TYPES.metric;

  const [input, setInput] = useState({
    gender: user?.gender,
    centimeters: user?.height_in_cm || "",
    feet: "",
    inches: "",
    kilograms: user?.weight_in_kg || "",
    pounds: "",
    age: user?.age || "",
    activity: user?.activity || "",
    goal: user?.goal || "",
  });

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
    if (calculatorType === CALCULATOR_TYPES.metric) {
      let pounds = Math.floor(Number(input.kilograms) / LIB_TO_KG);
      let totalInches = Number(input.centimeters) / INCHES_TO_CM;
      let feet = Math.floor(Number(totalInches) / 12);
      let inches = Math.round(totalInches - 12 * feet);
      setInput({
        ...input,
        pounds: String(pounds),
        feet: String(feet),
        inches: String(inches),
      });
    }
  }, [input.centimeters, input.kilograms]);

  useEffect(() => {
    if (calculatorType === CALCULATOR_TYPES.imperial) {
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

  const isFormIncomplete =
    !input.age ||
    !input.centimeters ||
    !input.gender ||
    !input.kilograms ||
    !input.activity ||
    !input.goal;

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

  // BMI con el resultado (que significa)

  // Agregar el calculador de tiempo en llegar al objetivo de peso si es que lo quiere agregar.

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    if (isFormIncomplete) {
      setError("Complete all fields to continue");
    } else {
      setIsLoading(true);
      const userUpdated: UserAccount = {
        ...user,
        activity: Number(input.activity),
        age: Number(input.age),
        gender: String(input.gender),
        goal: String(input.goal),
        height_in_cm: Number(input.centimeters),
        weight_in_kg: Number(input.kilograms),
        kcals_recommended: kcals_recommended,
        BMI: BMI,
        BMR: BMR,
      };
      const res = await updateUser(userUpdated);
      console.log({ res });
      if (!res?.error) {
        dispatch(setUpdateUser(userUpdated));
        handleSubmit();
      }
      setIsLoading(false);
    }
  };

  console.log({ input });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 text-xs s:text-sm sm:text-base">
      {/* <span className="text-3xl font-bold">Body features</span> */}
      <div className="flex w-full max-w-[30rem] flex-wrap">
        <label className="basis-1/5 font-semibold">Goal</label>
        <div className="mx-auto flex w-full basis-4/5 items-center justify-center gap-2">
          {GOAL_OPTIONS.map((opt) => (
            <button
              onClick={handleClick}
              className={`w-full min-w-max rounded-lg bg-gray-300 px-2 py-1 text-xs font-semibold text-black shadow-[0_0_5px_gray] sm:text-base ${
                input.goal === opt.value && "bg-green-500 text-white"
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
      <div className="flex w-full max-w-[30rem]">
        <label className="basis-1/5 font-semibold">Units</label>
        <div className="flex w-full basis-4/5 justify-center">
          <div className="relative flex cursor-pointer rounded-3xl border-green-500 text-xs shadow-[0_0_5px_gray] sm:text-base">
            <div
              className={`${
                calculatorType === CALCULATOR_TYPES.metric
                  ? "right-[50%]"
                  : "right-0"
              } absolute h-full w-[50%] rounded-3xl bg-green-500 transition-all duration-300`}
            ></div>
            {Object.keys(CALCULATOR_TYPES).map((type) => (
              <button
                key={type}
                onClick={() => setCalculatorType(type)}
                className="z-20 w-28 rounded-3xl border-none px-4 py-1 text-xs font-semibold active:shadow-lg sm:text-base"
              >
                {CALCULATOR_TYPES[type]}
              </button>
            ))}
          </div>
        </div>
      </div>
      <form
        action=""
        onSubmit={onSubmit}
        className="flex w-full max-w-[30rem] flex-col gap-10"
      >
        <div className="flex flex-col gap-3">
          <div className="flex w-full max-w-[30rem] flex-wrap">
            <label className="basis-1/5 font-semibold">Gender</label>
            <div className="mx-auto flex w-full basis-4/5 items-center justify-center gap-2">
              {GENDER_OPTIONS.map((opt) => (
                <button
                  onClick={handleClick}
                  className={`w-full rounded-lg bg-gray-300 px-2 py-1 text-xs font-semibold text-black shadow-[0_0_5px_gray] sm:text-base ${
                    input.gender === opt.value && "bg-green-500 text-white"
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
              <div className="flex items-center justify-between gap-1">
                <label
                  className="basis-1/5 font-semibold"
                  htmlFor="centimeters"
                >
                  Height
                </label>
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
              <div className="flex items-center justify-between gap-1">
                <label className="basis-1/5 font-semibold" htmlFor="kilograms">
                  Weight
                </label>
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
              <div className="flex items-center justify-between gap-1">
                <label htmlFor="feet" className="basis-1/5 font-semibold">
                  Height
                </label>
                <div className="flex basis-4/5 items-center gap-1">
                  <input
                    type="text"
                    name="feet"
                    id="feet"
                    placeholder="Feet"
                    onChange={handleChange}
                    value={input.feet}
                    className="flex w-full"
                  />
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
              <div className="flex items-center justify-between gap-1">
                <label htmlFor="pounds" className="basis-1/5 font-semibold">
                  Weight
                </label>
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
          <div className="flex items-center justify-between gap-1">
            <label className="basis-1/5 font-semibold" htmlFor="age">
              Age
            </label>
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
              name="activity"
              id="activity"
              className="flex w-full basis-4/5"
              onChange={handleChange}
              defaultValue={input.activity}
            >
              <option value="none" disabled hidden>
                Select
              </option>
              {ACTIVITY_OPTIONS.map((act) => (
                <option key={act.value} value={act.value}>
                  {act.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <SubmitButton
          className={"m-auto w-fit"}
          onClick={onSubmit}
          loadMessage={"Loading..."}
          content={`${isCreatingRoute ? "Continue" : "Save"}`}
          isLoading={isLoading}
          isDisabled={isFormIncomplete}
        />
        {error && (
          <span className="text-center font-medium text-red-400">{error}</span>
        )}
      </form>
      {/* <div className="flex gap-2">
        <span>BMI</span>
        <span>{BMI && BMI}</span>
      </div> */}
      {/* <div className="m-2 flex w-full max-w-[30rem] justify-center rounded-md border text-lg">
        <span>
          Calories recommended:
          <span className="text-green-500"> {result > 0 ? result : "-"}</span>
        </span>
      </div> */}
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
