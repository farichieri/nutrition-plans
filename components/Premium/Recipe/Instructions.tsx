import { FC } from "react";
import { Instruction } from "@/types/foodTypes";

const RecipeStep = ({ step }: { step: Instruction }) => {
  return (
    <div className="flex w-full items-center gap-1">
      <span className="h-full max-h-32 w-full rounded-lg border bg-transparent p-2 text-sm outline-none  placeholder:opacity-50 focus-within:border-black dark:focus-within:border-white">
        {step.text}
      </span>
    </div>
  );
};

interface Props {
  instructions: Instruction[];
}

const Instructions: FC<Props> = ({ instructions }) => {
  const instructionsSorted = [...instructions].sort(
    (a, b) => a.order - b.order
  );

  return (
    <div className="flex flex-col gap-1">
      <span className="text-3xl font-semibold">Instructions:</span>
      {instructionsSorted.map((instruction: Instruction, index: number) => (
        <div
          key={instruction.instruction_id}
          className="flex w-full items-center gap-1"
        >
          <span className="w-5 text-xs opacity-50">{index + 1}</span>
          <RecipeStep step={instruction} key={instruction.instruction_id} />
        </div>
      ))}
    </div>
  );
};

export default Instructions;
