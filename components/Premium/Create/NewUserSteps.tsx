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
          className="flex flex-col items-center justify-center"
        >
          <span>Step {step.step}</span>
          <button
            // onClick={() => setStepSelected(step.step)}
            className={`shadow-g rounded-lg px-3 py-1 capitalize text-white shadow-xl ${
              stepSelected === step.step ? "bg-green-500" : "bg-gray-500"
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
