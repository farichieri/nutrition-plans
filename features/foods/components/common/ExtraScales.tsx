import { FoodScale, FoodScales, InitialScale } from "../../types";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import React, { FC, useState } from "react";
import RoundButton from "@/components/Buttons/RoundButton";

interface Props {
  scales: FoodScales;
  handleChangeScales: Function;
}

const ExtraScales: FC<Props> = ({ scales, handleChangeScales }) => {
  const [openAdd, setOpenAdd] = useState(false);
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

  const handleOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenAdd(!openAdd);
  };

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    setNewScaleState(InitialScale);
    setOpenAdd(!openAdd);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newScaleState.scale_name || !newScaleState.scale_grams) return;
    const newScales = [...scales, newScaleState];
    handleChangeScales(newScales);
    setNewScaleState(InitialScale);
    setOpenAdd(false);
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.preventDefault();
    const index = Number((event.target as HTMLButtonElement).id);
    let newScales = [...scales];
    if (index > -1) {
      newScales.splice(index, 1);
    }
    handleChangeScales(newScales);
  };

  return (
    <div className="my-2 flex flex-col rounded-md border p-4">
      {openAdd && (
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
                customClass={""}
                handleChange={handleChange}
                id={"scale_grams"}
                isRequired={true}
                key={"scale_grams"}
                labelFor={"scale_grams"}
                labelText={"Equivalent weight in grams"}
                min={"0"}
                name={"scale_grams"}
                placeholder={""}
                step={"0.1"}
                title={"Scale Grams"}
                type={"number"}
                value={newScaleState["scale_grams"]}
                unit={"g"}
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
      )}
      <div>
        {scales.length > 0 && (
          <div>
            {scales.map((scale, index) => (
              <div
                className="my-2 flex w-full justify-between rounded-md border"
                key={index}
              >
                <div className="m-auto flex w-10 justify-center text-xs opacity-70">
                  {index + 1}
                </div>
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
            ))}
          </div>
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
