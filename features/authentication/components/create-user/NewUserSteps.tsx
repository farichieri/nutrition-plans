import { FC, ReactNode } from "react";

interface Props {
  steps: Array<{ step: number; name: string; icon: ReactNode }>;
  stepSelected: number;
}

const NewUserSteps: FC<Props> = ({ steps, stepSelected }) => {
  return (
    <div className="flex gap-2">
      {steps.map((step) => (
        <div
          key={step.step}
          className="flex flex-col items-center justify-center gap-0.5"
        >
          <span className="text-xs">Step {step.step}</span>
          <button
            className={`shadow-g flex cursor-default flex-wrap items-center justify-center gap-1 rounded-md border px-1 py-1  text-white shadow-xl xs:px-2  sm:px-3  ${
              stepSelected === step.step
                ? "border-green-500 bg-green-500/50"
                : "bg-gray-500/50"
            }`}
          >
            <span className="text-xs capitalize xs:text-sm sm:text-base">
              {step.name}
            </span>
            {step.icon}
          </button>
        </div>
      ))}
    </div>
  );
};
export default NewUserSteps;
