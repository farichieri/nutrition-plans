import { AddExtraScale } from "./AddExtraScale";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FoodScales } from "../../../types";
import { MdDelete, MdDragHandle } from "react-icons/md";
import { reorderArr } from "@/utils/filter";
import React, { FC, useState } from "react";
import RoundButton from "@/components/Buttons/RoundButton";

interface Props {
  scales: FoodScales;
  handleChangeScales: Function;
}

const ExtraScales: FC<Props> = ({ scales, handleChangeScales }) => {
  const [openAdd, setOpenAdd] = useState(false);

  const handleRemove = (index: number) => {
    let newScales = [...scales];
    if (index > -1) {
      newScales.splice(index, 1);
    }
    handleChangeScales(newScales);
  };

  const handleOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenAdd(!openAdd);
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    const scalesReordered = reorderArr(scales, source.index, destination.index);
    handleChangeScales(scalesReordered);
  };

  return (
    <div className="my-2 flex flex-col rounded-md border p-4">
      {openAdd && (
        <AddExtraScale
          handleChangeScales={handleChangeScales}
          setOpenAdd={setOpenAdd}
          handleOpen={handleOpen}
          openAdd={openAdd}
          scales={scales}
        />
      )}
      <div>
        {scales.length > 0 && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="ingredients">
              {(droppableProvided) => (
                <div
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                  className="divide-y"
                >
                  {scales.map((scale, index) => {
                    if (!scale.id) return;
                    return (
                      <Draggable
                        key={scale.id}
                        draggableId={String(scale.id)}
                        index={index}
                      >
                        {(draggableProvided) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            className="flex select-none items-center gap-2 px-0 py-2 hover:bg-slate-500/20 active:bg-slate-500/40"
                          >
                            <MdDragHandle className="h-6 w-6 opacity-50" />
                            <div
                              className={`my-2 flex w-full justify-between rounded-md border ${
                                scale.isCreationScale &&
                                "border-green-500 bg-green-500/50"
                              }`}
                              key={index}
                            >
                              <div className="flex w-full flex-col divide-y border-x">
                                <div className="flex items-baseline justify-between p-2">
                                  <span>1 {scale.scaleName}</span>
                                  {scale.scaleGrams > 0 && (
                                    <span>{`(${scale.scaleGrams} grams)`}</span>
                                  )}
                                </div>
                              </div>
                              <div className="m-auto flex">
                                {!scale.isCreationScale && (
                                  <RoundButton
                                    customClass="w-10 h-10 p-1.5 my-auto ml-auto !rounded-sm"
                                    onClick={() => handleRemove(index)}
                                  >
                                    <MdDelete className="h-6 w-6" />
                                  </RoundButton>
                                )}
                              </div>
                            </div>
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
        )}
      </div>

      <button
        className="ml-auto w-40 rounded-md border border-green-500 px-3 py-1 hover:bg-green-500/40 active:bg-green-500"
        onClick={handleOpen}
      >
        Add New Scale
      </button>
    </div>
  );
};

export default ExtraScales;
