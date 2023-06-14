import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FoodScale, FoodScales, InitialScale } from "../../types";
import { reorderArr } from "@/utils/filter";
import { uuidv4 } from "@firebase/util";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import React, { FC, MouseEventHandler, useState } from "react";
import RoundButton from "@/components/Buttons/RoundButton";

interface AddExtraScaleProps {
  handleChangeScales: Function;
  setOpenAdd: Function;
  handleOpen: MouseEventHandler;
  openAdd: boolean;
  scales: FoodScales;
}

const AddExtraScale: FC<AddExtraScaleProps> = ({
  openAdd,
  handleOpen,
  scales,
  handleChangeScales,
  setOpenAdd,
}) => {
  const [newScaleState, setNewScaleState] = useState<FoodScale>(InitialScale);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    const type = event.target.type;
    const valueF = type === "number" ? Number(value) : value;
    setNewScaleState({
      ...newScaleState,
      [name]: valueF,
    });
  };

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    setNewScaleState(InitialScale);
    setOpenAdd(!openAdd);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newScaleState.scale_name || !newScaleState.scale_grams) return;
    const uuid = uuidv4();
    const newScale = {
      ...newScaleState,
      id: uuid,
    };
    const newScales = [...scales, newScale];
    handleChangeScales(newScales);
    setNewScaleState(InitialScale);
    setOpenAdd(false);
  };
  return (
    <div className="absolute z-[100] w-full rounded-md border ">
      <div onClick={handleOpen} className="fixed inset-0 bg-black/60" />
      <div className="relative z-[100] rounded-md border bg-white dark:bg-slate-700">
        <div className="p-4">
          <span className="text-xl font-semibold">New Scale:</span>
          <Input
            customClass={""}
            handleChange={handleChange}
            id={"scale_name"}
            isRequired={true}
            key={"scale_name"}
            labelFor={"scale_name"}
            labelText={"Scale Name"}
            name={"scale_name"}
            placeholder={""}
            title={"Scale Name"}
            type={"text"}
            value={newScaleState["scale_name"] || ""}
          />
          <NutritionInput
            changed={false}
            handleChange={handleChange}
            id={"scale_grams"}
            labelText={"Equivalent weight in grams"}
            name="scale_grams"
            title="Scale Grams"
            type="number"
            min={"0"}
            unit={"g"}
            value={newScaleState["scale_grams"]}
          />
        </div>
        <div className="mt-4 flex w-full justify-center gap-2 border-t p-4 dark:border-white">
          <button
            onClick={handleCancel}
            className="rounded-md border border-red-500 px-3 py-1 hover:bg-red-500/40 active:bg-red-500"
          >
            Discard
          </button>
          <button
            onClick={handleAdd}
            className="rounded-md border border-green-500 px-3 py-1 hover:bg-green-500/40 active:bg-green-500"
          >
            Add Scale
          </button>
        </div>
      </div>
    </div>
  );
};

interface Props {
  scales: FoodScales;
  handleChangeScales: Function;
}

const ExtraScales: FC<Props> = ({ scales, handleChangeScales }) => {
  const [openAdd, setOpenAdd] = useState(false);

  const handleRemove = (event: React.MouseEvent) => {
    event.preventDefault();
    const index = Number((event.target as HTMLButtonElement).id);
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
                        draggableId={scale.id}
                        index={index}
                      >
                        {(draggableProvided) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            className="flex select-none items-center gap-2 px-0 py-2 hover:bg-slate-500/20 active:bg-slate-500/40"
                          >
                            <span className="material-icons-outlined opacity-50">
                              drag_handle
                            </span>
                            <div
                              className="my-2 flex w-full justify-between rounded-md border"
                              key={index}
                            >
                              <div className="flex w-full flex-col divide-y border-x">
                                <div className="flex items-baseline justify-between p-2">
                                  <span>1 {scale.scale_name}</span>
                                  <span>{`(${scale.scale_grams} grams)`}</span>
                                </div>
                              </div>
                              <div className="m-auto flex">
                                <RoundButton
                                  customClass="w-10 h-10 p-1.5 my-auto ml-auto !rounded-sm"
                                  onClick={handleRemove}
                                  id={String(index)}
                                >
                                  <span className="material-icons pointer-events-none">
                                    delete
                                  </span>
                                </RoundButton>
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
