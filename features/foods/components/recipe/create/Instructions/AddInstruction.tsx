import { Instruction } from "@/features/foods";
import { FC, useState } from "react";
import { uuidv4 } from "@firebase/util";
import RoundButton from "@/components/Buttons/RoundButton";
import { MdAdd } from "react-icons/md";

interface Props {
  handleUpdateInstructions: Function;
  instructions: Instruction[];
}

const AddInstruction: FC<Props> = ({
  handleUpdateInstructions,
  instructions,
}) => {
  const [newInstruction, setNewInstruction] = useState<Instruction>({
    id: "",
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
    const instructionsUpdated = [
      ...instructions,
      { ...newInstruction, id: uuid },
    ];
    handleUpdateInstructions(instructionsUpdated);

    setNewInstruction({
      id: "",
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
        customClass="py-1.5 px-2 my-auto ml-auto !border-green-400 bg-green-400/30"
        onClick={handleAddInstruction}
      >
        <span className="text-sm">Add</span>
        <MdAdd className="h-5 w-5" />
      </RoundButton>
    </div>
  );
};

export default AddInstruction;
