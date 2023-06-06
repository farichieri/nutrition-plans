import { PlanGeneratorTypes, PlanGeneratorTypesT } from "../types";
import { selectPlansSlice, setPlanGeneratorType } from "../slice";
import { useDispatch, useSelector } from "react-redux";
import React, { FC } from "react";

interface Props {}

const PlanGeneratorTypeSelector: FC<Props> = () => {
  const dispatch = useDispatch();
  const { planGeneratorType } = useSelector(selectPlansSlice);

  const selectNewType = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault;
    const id = (event.target as HTMLButtonElement).id;
    const generatorType = PlanGeneratorTypes[id as keyof PlanGeneratorTypesT];
    dispatch(setPlanGeneratorType(generatorType));
  };

  return (
    <div className="ml-auto flex gap-5">
      {Object.keys(PlanGeneratorTypes).map((p) => (
        <button
          onClick={selectNewType}
          id={p}
          className={`rounded-md border px-3 py-1.5 capitalize ${
            planGeneratorType === p
              ? "border-green-500 bg-green-900"
              : "border-gray-400"
          }`}
          key={p}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default PlanGeneratorTypeSelector;
