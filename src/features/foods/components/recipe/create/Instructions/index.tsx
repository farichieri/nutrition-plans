import { FC } from "react";
import AddInstruction from "./AddInstruction";
import RecipeInstructions from "./RecipeInstructions";
import { Instruction } from "@/features/foods";

interface Props {
  handleUpdateInstructions: Function;
  instructions: Instruction[];
}

const Instructions: FC<Props> = ({
  handleUpdateInstructions,
  instructions,
}) => {
  return (
    <div>
      <RecipeInstructions
        instructions={instructions}
        handleUpdateInstructions={handleUpdateInstructions}
      />
      <AddInstruction
        instructions={instructions}
        handleUpdateInstructions={handleUpdateInstructions}
      />
    </div>
  );
};

export default Instructions;
