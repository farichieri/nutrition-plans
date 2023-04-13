import { FC, useState } from "react";

interface Props {}

const BMRCalculator: FC<Props> = () => {
  const FEET_TO_CM = 30.48;
  const INCHES_TO_CM = 2.54;
  const LIB_TO_KG = 0.45359237;
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

  const [input, setInput] = useState({
    gender: "",
    centimeters: "",
    feet: "",
    inches: "",
    kilograms: "",
    pounds: "",
    age: "",
    activity: "",
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

  const calculate = () => {
    let age, height, weight, sex, activity;
    if (calculatorType === CALCULATOR_TYPES.metric) {
      if (
        !input.age ||
        !input.centimeters ||
        !input.gender ||
        !input.kilograms ||
        !input.activity
      ) {
        return "";
      }
      age = input.age;
      height = input.centimeters;
      weight = input.kilograms;
      sex = input.gender;
      activity = input.activity;
    } else {
      if (
        !input.age ||
        !input.feet ||
        !input.inches ||
        !input.gender ||
        !input.pounds ||
        !input.activity
      ) {
        return "";
      }
      age = input.age;
      height =
        Number(input.feet) * FEET_TO_CM + Number(input.inches) * INCHES_TO_CM;
      weight = Number(input.pounds) * LIB_TO_KG;
      sex = input.gender;
      activity = input.activity;
    }

    const standard =
      10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age);
    const result = sex === "male" ? standard + 5 : standard - 161;
    console.log({ standard });
    return Math.round(Number(result) * Number(activity));
  };

  const result = Number(calculate());
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="relative mb-2 flex cursor-pointer rounded-3xl  border-green-500 shadow-[0_0_5px_gray]">
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
            className="z-20 w-24 rounded-3xl border-none px-4 py-1"
          >
            {CALCULATOR_TYPES[type]}
          </button>
        ))}
      </div>

      {calculatorType === CALCULATOR_TYPES.metric ? (
        <form action="" className="flex w-full max-w-[30rem] flex-col gap-2">
          <div className="flex items-center justify-between gap-1">
            <label htmlFor="gender" className="basis-1/4">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="flex w-full basis-3/4"
              onChange={handleChange}
              defaultValue="none"
              value={input.gender}
            >
              <option value="none" disabled hidden>
                Select
              </option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>
          </div>
          <div className="flex items-center justify-between gap-1">
            <label className="basis-1/4" htmlFor="centimeters">
              Height
            </label>
            <input
              type="text"
              name="centimeters"
              id="centimeters"
              placeholder="Centimeters"
              onChange={handleChange}
              value={input.centimeters}
              className="flex w-full basis-3/4"
            />
          </div>
          <div className="flex items-center justify-between gap-1">
            <label className="basis-1/4" htmlFor="kilograms">
              Weight
            </label>
            <input
              type="text"
              name="kilograms"
              placeholder="Kilograms"
              onChange={handleChange}
              value={input.kilograms}
              className="flex w-full basis-3/4"
            />
          </div>
          <div className="flex items-center justify-between gap-1">
            <label className="basis-1/4" htmlFor="age">
              Age
            </label>
            <input
              type="text"
              name="age"
              placeholder="Years"
              onChange={handleChange}
              value={input.age}
              className="flex w-full basis-3/4"
            />
          </div>
          <div className="flex items-center justify-between gap-1">
            <label className="basis-1/4" htmlFor="activity">
              Activity
            </label>
            <select
              name="activity"
              id="activity"
              className="flex w-full basis-3/4"
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
      ) : (
        <form action="" className="flex w-full max-w-[30rem] flex-col gap-2">
          <div className="flex items-center justify-between gap-1">
            <label htmlFor="gender" className="basis-1/4">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              onChange={handleChange}
              className="flex w-full basis-3/4"
              defaultValue="none"
              value={input.gender}
            >
              <option value="none" selected disabled hidden>
                Select
              </option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>
          </div>
          <div className="flex items-center justify-between gap-1">
            <label htmlFor="feet" className="basis-1/4">
              Height
            </label>
            <div className="flex basis-3/4 items-center gap-1">
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
            <label htmlFor="pounds" className="basis-1/4">
              Weight
            </label>
            <input
              type="text"
              name="pounds"
              id="pounds"
              placeholder="Pounds"
              onChange={handleChange}
              value={input.pounds}
              className="flex w-full basis-3/4"
            />
          </div>
          <div className="flex items-center justify-between gap-1">
            <label htmlFor="years" className="basis-1/4">
              Age
            </label>
            <input
              type="text"
              name="age"
              id="years"
              placeholder="Years"
              onChange={handleChange}
              value={input.age}
              className="flex w-full basis-3/4"
            />
          </div>
          <div className="flex items-center gap-1">
            <label htmlFor="activity" className="basis-1/4">
              Activity
            </label>
            <select
              name="activity"
              id="activity"
              className="flex w-full basis-3/4"
              onChange={handleChange}
              defaultValue="none"
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
      )}
      <div className="m-2 flex w-full max-w-[30rem] justify-center rounded-md border text-lg">
        <span>
          Basal Metabolic Rate:
          <span className="text-green-500"> {result > 0 ? result : "-"}</span>
        </span>
      </div>
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
