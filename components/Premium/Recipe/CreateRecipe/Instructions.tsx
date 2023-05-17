import { FC } from "react";
import { Instruction } from "@/types/foodTypes";
import {
  selectCreateFoodSlice,
  setRecipeState,
} from "@/store/slices/createFoodSlice";
import { useDispatch, useSelector } from "react-redux";

const RecipeStep = ({ step }: { step: Instruction }) => {
  const dispatch = useDispatch();
  const { recipeState } = useSelector(selectCreateFoodSlice);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const id = event.target.id;

    const instructions = [...recipeState.instructions];
    const ingredientExists = instructions.find(
      (ing) => ing.instruction_id === id
    );

    const ingredientUpdated: Instruction = {
      ...step,
      [name]: value,
    };

    if (ingredientExists) {
      instructions[instructions.indexOf(ingredientExists)] = ingredientUpdated;
      dispatch(
        setRecipeState({
          ...recipeState,
          instructions: instructions,
        })
      );
    }
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const id = (event.target as HTMLButtonElement).id;
    const instructions = [...recipeState.instructions];
    const instructionExists = instructions.find(
      (ing) => ing.instruction_id === id
    );

    if (instructionExists) {
      instructions.splice(instructions.indexOf(instructionExists), 1);
      dispatch(
        setRecipeState({
          ...recipeState,
          instructions: instructions,
        })
      );
    }
  };

  return (
    <div className="flex w-full items-center gap-1">
      <textarea
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        className="min-h-20 h-full max-h-32 w-full rounded-lg border bg-transparent p-2 text-sm outline-none  placeholder:opacity-50 focus-within:border-black dark:focus-within:border-white"
        id={step.instruction_id}
        name="text"
        onChange={handleChange}
        placeholder="New Instruction..."
        spellCheck={false}
        value={step.text}
      />
      <button
        className="flex items-center"
        id={step.instruction_id}
        onClick={handleRemove}
      >
        <span className="material-icons pointer-events-none w-6">
          delete_outlined
        </span>
      </button>
    </div>
  );
};

interface Props {}

const Instructions: FC<Props> = () => {
  const { recipeState } = useSelector(selectCreateFoodSlice);
  return (
    <div className="flex flex-col gap-1">
      {recipeState.instructions.map(
        (instruction: Instruction, index: number) => (
          <div
            className="flex w-full items-center gap-1"
            key={instruction.instruction_id}
          >
            <span className="w-5 text-xs opacity-50">{index + 1}</span>
            <RecipeStep step={instruction} key={instruction.instruction_id} />
          </div>
        )
      )}
    </div>
  );
};

export default Instructions;
