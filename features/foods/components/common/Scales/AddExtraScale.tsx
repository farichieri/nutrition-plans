import { FoodScale, FoodScales, InitialScale } from "../../../types";
import { uuidv4 } from "@firebase/util";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import React, { FC, MouseEventHandler, useState } from "react";

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

  console.log({ scales });

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
    if (!newScaleState.scaleName || !newScaleState.scaleGrams) return;
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
      <div className="relative z-[100] rounded-md border bg-tertiary-color">
        <div className="flex flex-col justify-center p-10 ">
          <span className="mb-4 text-xl font-semibold">New Scale:</span>
          <NutritionInput
            customClass={""}
            handleChange={handleChange}
            id={"scaleAmount"}
            key={"scaleAmount"}
            labelText={"Scale Amount"}
            placeholder={"Scale Amount"}
            name={"scaleAmount"}
            title={"Scale Amount"}
            type={"number"}
            min={"0"}
            value={newScaleState["scaleAmount"] || ""}
          />
          <Input
            customClass={""}
            handleChange={handleChange}
            id={"scaleName"}
            isRequired={true}
            key={"scaleName"}
            labelFor={"scaleName"}
            labelText={"Scale Name"}
            placeholder={"Scale Name"}
            name={"scaleName"}
            title={"Scale Name"}
            type={"text"}
            value={newScaleState["scaleName"] || ""}
          />
          <NutritionInput
            changed={false}
            handleChange={handleChange}
            id={"scaleGrams"}
            labelText={"Equivalent weight in grams"}
            name="scaleGrams"
            title="Scale Grams"
            type="number"
            min={"0"}
            unit={"g"}
            value={newScaleState["scaleGrams"]}
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

export { AddExtraScale };
