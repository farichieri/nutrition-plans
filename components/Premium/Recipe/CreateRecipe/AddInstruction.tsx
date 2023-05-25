import {
  selectCreateFoodSlice,
  setRecipeState,
} from "@/store/slices/createFoodSlice";
import { FC, useState } from "react";
import { Instruction } from "@/types/foodTypes";
import { useDispatch, useSelector } from "react-redux";
import { uuidv4 } from "@firebase/util";
import RoundButton from "@/components/Buttons/RoundButton";

interface Props {}

const AddInstruction: FC<Props> = () => {
  const dispatch = useDispatch();
  const { recipeState } = useSelector(selectCreateFoodSlice);
  const [newInstruction, setNewInstruction] = useState<Instruction>({
    instruction_id: "",
    order: -1,
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
      order: -1,
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
        className="min-h-10 h-full max-h-32 w-full rounded-lg border bg-transparent p-2 text-sm outline-none  placeholder:opacity-50 focus-within:border-black dark:focus-within:border-white"
      />
      <RoundButton
        customClass="w-10 h-10 p-1.5 my-auto ml-auto"
        onClick={handleAddInstruction}
      >
        <span className="material-icons pointer-events-none">add</span>
      </RoundButton>
    </div>
  );
};

export default AddInstruction;
