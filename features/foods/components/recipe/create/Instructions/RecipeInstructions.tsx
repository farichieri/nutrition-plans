import { Instruction } from "@/features/foods";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FC, useEffect, useState } from "react";
import { reorderArr } from "@/utils/filter";
import RoundButton from "@/components/Buttons/RoundButton";
import { MdDelete, MdDragHandle } from "react-icons/md";

interface InstructionProps {
  instructions: Instruction[];
  inst: Instruction;
  handleUpdateInstructions: Function;
}
const InstructionC: FC<InstructionProps> = ({
  instructions,
  inst,
  handleUpdateInstructions,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const id = event.target.id;

    const ingredientExists = instructions.find((ing) => ing.id === id);

    const ingredientUpdated: Instruction = {
      ...inst,
      [name]: value,
    };

    if (ingredientExists) {
      instructions[instructions.indexOf(ingredientExists)] = ingredientUpdated;
      handleUpdateInstructions(instructions);
    }
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const id = (event.target as HTMLButtonElement).id;
    const instructionExists = instructions.find((ing) => ing.id === id);

    if (instructionExists) {
      instructions.splice(instructions.indexOf(instructionExists), 1);
      handleUpdateInstructions(instructions);
    }
  };

  return (
    <div className="flex w-full items-center gap-1">
      <textarea
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        className="min-h-20 h-full max-h-32 w-full rounded-lg border bg-transparent p-2 text-sm outline-none  placeholder:opacity-50 focus-within:border-black dark:focus-within:border-white"
        id={inst.id}
        name="text"
        onChange={handleChange}
        placeholder="New Instruction..."
        spellCheck={false}
        value={inst.text}
      />

      <RoundButton
        customClass="w-10 h-10 p-1.5 my-auto ml-auto"
        onClick={handleRemove}
        id={inst.id}
      >
        <MdDelete className="pointer-events-none h-6 w-6" />
      </RoundButton>
    </div>
  );
};

interface Props {
  handleUpdateInstructions: Function;
  instructions: Instruction[];
}

const RecipeInstructions: FC<Props> = ({
  handleUpdateInstructions,
  instructions,
}) => {
  const insArrSorted = [...instructions].sort((a, b) => a.order - b.order);
  const [ingsState, setIngsState] = useState<Instruction[]>(insArrSorted);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    const ingsReordered = reorderArr(
      ingsState,
      source.index,
      destination.index
    );
    updateIngredientsOrder(ingsReordered);
    setIngsState(ingsReordered);
  };

  const updateIngredientsOrder = async (ingsReordered: Instruction[]) => {
    const instructionsUpdated = ingsReordered.map((inst, index) => {
      return { ...inst, order: index };
    });
    handleUpdateInstructions(instructionsUpdated);
  };

  useEffect(() => {
    const insts = [...instructions].sort((a, b) => a.order - b.order);
    setIngsState(insts);
  }, [instructions]);

  return (
    <div className="flex flex-col gap-1">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="ingredients">
          {(droppableProvided) => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="divide-y"
            >
              {instructions.map((inst, index) => {
                if (inst.id)
                  return (
                    <Draggable
                      key={inst.id}
                      draggableId={inst.id}
                      index={index}
                    >
                      {(draggableProvided) => (
                        <div
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          className="flex items-center gap-1  py-2 hover:bg-slate-500/20 active:bg-slate-500/40"
                        >
                          <MdDragHandle className="h-6 w-6 opacity-50" />
                          <InstructionC
                            instructions={instructions}
                            inst={inst}
                            key={inst.id}
                            handleUpdateInstructions={handleUpdateInstructions}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
              })}

              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default RecipeInstructions;
