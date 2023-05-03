import { FC } from "react";

interface Props {
  steps: Array<{ step: number; name: string }>;
  stepSelected: number;
  setStepSelected: Function;
}

const NewUserSteps: FC<Props> = ({ steps, stepSelected, setStepSelected }) => {
  return (
    <div className="flex gap-2">
      {steps.map((step) => (
        <div
          key={step.step}
          className="flex flex-col items-center justify-center gap-0.5"
        >
          <span className="text-xs">Step {step.step}</span>
          <button
            className={`shadow-g cursor-default rounded-md border px-1 py-1 text-xs capitalize text-white shadow-xl xs:px-2 xs:text-sm sm:px-3 sm:text-base ${
              stepSelected === step.step
                ? "border-green-500 bg-green-500/50"
                : "bg-gray-500/50"
            }`}
          >
            {step.name}
          </button>
        </div>
      ))}
    </div>
  );
};
export default NewUserSteps;
