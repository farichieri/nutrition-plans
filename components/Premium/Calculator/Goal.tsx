import { FC, useState } from "react";

interface Props {}

const Goal: FC<Props> = () => {
  const [goal, setGoal] = useState("");

  const FOOD_PREFERENCES = [
    { value: "lose-weight", name: "Lose weight" },
    { value: "maintain", name: "Maintain" },
    { value: "Build-muscle", name: "Build Muscle" },
  ];
  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-[30rem] flex-wrap">
        <span className="basis-1/4">Objetive</span>
        <div className="mx-auto flex w-full basis-3/4 items-center justify-center gap-2">
          {FOOD_PREFERENCES.map((opt) => (
            <button
              onClick={() => setGoal(opt.value)}
              className={`w-full min-w-max rounded-lg bg-gray-300 px-2 py-1 text-xs text-black sm:text-base ${
                goal === opt.value && "bg-green-500 text-white"
              }`}
              key={opt.value}
              value={opt.value}
            >
              {opt.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Goal;
