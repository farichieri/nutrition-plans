import SubmitButton from "@/components/Buttons/SubmitButton";
import { FC, useState } from "react";

interface Props {}

const BMRCalculator: FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
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
  const ACTIVITY_OPTIONS = [
    {
      name: "Little or no exercise",
      value: 1.2,
      description: "little to no exercise",
    },
    {
      name: "Light exercise (1 to 3 days per week)",
      value: 1.375,
      description: "light exercise 1 to 3 days per week",
    },
    {
      name: "Moderate exercise (3 to 5 days per week)",
      value: 1.55,
      description: "moderate exercise 6 to 7 days per week)",
    },
    {
      name: "Very active (6 to 7 days per week)",
      value: 1.725,
      description: "hard exercise every day, or exercising twice a day",
    },
    {
      name: "Extra active (very hard exercise and physical)",
      value: 1.9,
      description: "very hard exercise, training, or a physical job",
    },
  ];
  const GENDERS = [
    { value: "male", name: "Male" },
    { value: "female", name: "Female" },
  ];
  const GOAL_OPTIONS = [
    { value: "lose-weight", name: "Lose weight" },
    { value: "maintain", name: "Maintain" },
    { value: "Build-muscle", name: "Build Muscle" },
  ];

  const [input, setInput] = useState({
    gender: "none",
    centimeters: "",
    feet: "",
    inches: "",
    kilograms: "",
    pounds: "",
    age: "",
    activity: "",
    goal: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const name = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;
    console.log({ name });
    console.log({ value });
    setInput({
      ...input,
      [name]: value,
    });
  };

  const calculate = () => {
    let age, height, weight, sex, activity, goal;
    if (calculatorType === CALCULATOR_TYPES.metric) {
      if (
        !input.age ||
        !input.centimeters ||
        !input.gender ||
        !input.kilograms ||
        !input.activity ||
        !input.goal
      ) {
        return "";
      }
      age = input.age;
      height = input.centimeters;
      weight = input.kilograms;
      sex = input.gender;
      activity = input.activity;
      goal = input.goal;
    } else {
      if (
        !input.age ||
        !input.feet ||
        !input.inches ||
        !input.gender ||
        !input.pounds ||
        !input.activity ||
        !input.goal
      ) {
        return "";
      }
      age = input.age;
      height =
        Number(input.feet) * FEET_TO_CM + Number(input.inches) * INCHES_TO_CM;
      weight = Number(input.pounds) * LIB_TO_KG;
      sex = input.gender;
      activity = input.activity;
      goal = input.goal;
    }

    const standard =
      10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age);
    const result = sex === "male" ? standard + 5 : standard - 161;
    const goalCalories =
      goal === GOAL_OPTIONS[0].value
        ? KCALS_TO_LOSE
        : goal === GOAL_OPTIONS[2].value
        ? KCALS_TO_GAIN
        : 0;

    return Math.round(Number(result) * Number(activity) + goalCalories);
  };

  const result = Number(calculate());
  const isMetricUnits = calculatorType === CALCULATOR_TYPES.metric;

  const BMI =
    Number(input.kilograms) /
    (Number(input.centimeters) * Number(input.centimeters));
  // BMI con el resultado (que significa)
  console.log(BMI);

  // Agregar el calculador de tiempo en llegar al objetivo de peso si es que lo quiere agregar.

  const handleSubmit = () => {};

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 text-xs s:text-sm sm:text-base">
      <span className="text-3xl font-bold">Body features</span>
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
      <form action="" className="flex w-full max-w-[30rem] flex-col gap-3">
        <div className="flex w-full max-w-[30rem] flex-wrap">
          <label className="basis-1/5 font-semibold">Gender</label>
          <div className="mx-auto flex w-full basis-4/5 items-center justify-center gap-2">
            {GENDERS.map((opt) => (
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
              <label className="basis-1/5 font-semibold" htmlFor="centimeters">
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
            defaultValue={"none"}
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
      </form>
      <div className="flex gap-2">
        <span>BMI</span>
        <span>{BMI && BMI}</span>
      </div>
      <div className="m-2 flex w-full max-w-[30rem] justify-center rounded-md border text-lg">
        <span>
          Calories recommended:
          <span className="text-green-500"> {result > 0 ? result : "-"}</span>
        </span>
      </div>
      <SubmitButton
        className={""}
        onClick={handleSubmit}
        loadMessage={"Saving..."}
        content="Save"
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
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

export default BMRCalculator;
