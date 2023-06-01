import {
  Instruction,
  selectFoodsSlice,
  setRecipeState,
} from "@/features/foods";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FC, useEffect, useState } from "react";
import { reorderArr } from "@/utils/filter";
import { useDispatch, useSelector } from "react-redux";
import RoundButton from "@/components/Buttons/RoundButton";

const RecipeStep = ({ step }: { step: Instruction }) => {
  const dispatch = useDispatch();
  const { recipeState } = useSelector(selectFoodsSlice);

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

      <RoundButton
        customClass="w-10 h-10 p-1.5 my-auto ml-auto"
        onClick={handleRemove}
        id={step.instruction_id}
      >
        <span className="material-icons pointer-events-none">delete</span>
      </RoundButton>
    </div>
  );
};

interface Props {}

const InstructionsCreate: FC<Props> = () => {
  const { recipeState } = useSelector(selectFoodsSlice);
  const instructions = recipeState.instructions;
  const dispatch = useDispatch();

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
    const instsUpdated = ingsReordered.map((inst, index) => {
      return { ...inst, order: index };
    });

    dispatch(
      setRecipeState({
        ...recipeState,
        instructions: instsUpdated,
      })
    );
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
                if (inst.instruction_id)
                  return (
                    <Draggable
                      key={inst.instruction_id}
                      draggableId={inst.instruction_id}
                      index={index}
                    >
                      {(draggableProvided) => (
                        <div
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          className="flex items-center gap-2  py-2 hover:bg-slate-500/20 active:bg-slate-500/40"
                        >
                          <span className="material-icons-outlined opacity-50">
                            drag_handle
                          </span>
                          <RecipeStep step={inst} key={inst.instruction_id} />
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

export default InstructionsCreate;
