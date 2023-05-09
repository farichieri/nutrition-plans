import {
  selectCreateRecipeSlice,
  setRecipeState,
} from "@/store/slices/createRecipeSlice";
import { FC, useState } from "react";
import { Instruction } from "@/types/foodTypes";
import { useDispatch, useSelector } from "react-redux";
import { uuidv4 } from "@firebase/util";

interface Props {}

const AddInstruction: FC<Props> = () => {
  const dispatch = useDispatch();
  const { recipeState } = useSelector(selectCreateRecipeSlice);
  const [newInstruction, setNewInstruction] = useState<Instruction>({
    instruction_id: "",
    order: 0,
    recipe_id: recipeState.food_id || "",
    text: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;

    setNewInstruction({
      ...newInstruction,
      [name]: value,
    });
  };

  const handleAddInstruction = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newInstruction.text) {
      return;
    }
    const uuid = uuidv4();

    dispatch(
      setRecipeState({
        ...recipeState,
        instructions: [
          ...recipeState.instructions,
          {
            ...newInstruction,
            instruction_id: uuid,
          },
        ],
      })
    );
    setNewInstruction({
      instruction_id: "",
      order: 0,
      recipe_id: recipeState.food_id || "",
      text: "",
    });
  };

  return (
    <div className="flex w-full items-center gap-1 rounded-md">
      <textarea
        autoCorrect="off"
        autoComplete="off"
        autoCapitalize="off"
        name="text"
        spellCheck={false}
        onChange={handleChange}
        value={newInstruction.text}
        placeholder="New Instruction..."
        className="h-full max-h-32 min-h-10 w-full rounded-lg border bg-transparent p-2 text-sm outline-none  placeholder:opacity-50 focus-within:border-black dark:focus-within:border-white"
      />
      <button onClick={handleAddInstruction} className="flex items-center">
        <span className="material-icons pointer-events-none">add</span>
      </button>
    </div>
  );
};

export default AddInstruction;