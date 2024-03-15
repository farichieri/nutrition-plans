"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

import { format } from "url";

import FormSelect from "@/components/Form/FormSelect";
import NutritionInput from "@/components/Form/NutritionInput";
import { Food, getDefaultScale, getScaleOptions } from "@/features/foods";

interface Props {
  food: Food;
  scaleAmount: number;
  scaleName: string;
  updateRoute: boolean;
  setLocalScale: Function;
}

const ScaleSelector: FC<Props> = ({
  food,
  scaleAmount,
  scaleName,
  updateRoute,
  setLocalScale,
}) => {
  const [isNotOriginal, setIsNotOriginal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const options = getScaleOptions({ scales: food.scales });
  const defaultScale = getDefaultScale(food.scales);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.preventDefault();
    if (!food) return;
    const id = event.target.id;
    const value = event.target.value;

    let newAmount;
    let newScale;

    if (id === "scaleAmount") {
      newAmount = Number(value);
      newScale = scaleName;
    }
    if (id === "scaleName") {
      // newAmount = getNewAmount({
      //   scales: scalesMerged,
      //   prev_scale_name: scaleName,
      //   new_scale_name: value,
      //   scaleAmount,
      // });
      newAmount = 1;
      newScale = value;
    }
    // check params
    if (updateRoute) {
      const url = format({
        pathname: pathname,
        query: {
          id: params?.id,
          amount: newAmount,
          scale: newScale,
        },
      });
      router.replace(url, { scroll: false });
    } else {
      setLocalScale(newAmount, newScale);
    }
  };

  const setOriginal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!food) return;

    if (updateRoute) {
      const url = format({
        pathname: pathname,
        query: {
          id: params?.id,
        },
      });
      router.replace(url, { scroll: false });
    } else {
      const { scaleAmount, scaleName } = defaultScale;
      setLocalScale(scaleAmount, scaleName);
    }
  };

  useEffect(() => {
    if (!food) return;
    if (
      scaleName !== defaultScale.scaleName ||
      scaleAmount !== defaultScale.scaleAmount
    ) {
      setIsNotOriginal(true);
    } else {
      setIsNotOriginal(false);
    }
  }, [scaleAmount, scaleName]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 ">
      <div
        id="tour-food-1"
        className="flex w-full flex-wrap items-center justify-between"
      >
        <div className="flex w-auto max-w-[50%] ">
          <NutritionInput
            changed={false}
            handleChange={handleChange}
            id={"scaleAmount"}
            key={"scaleAmount"}
            labelText={"Scale Amount"}
            name={"scaleAmount"}
            min={"0"}
            title={""}
            type={"number"}
            value={Number(scaleAmount)}
          />
        </div>
        <div className="flex w-auto max-w-[50%]">
          <FormSelect
            customClass={""}
            handleChange={handleChange}
            id={"scaleName"}
            labelText={"Scale name"}
            title={"Scale name"}
            options={options}
            value={scaleName}
          />
        </div>
      </div>
      <div className="m-2 flex justify-center">
        {isNotOriginal && (
          <button
            className="m-auto rounded-3xl border px-4 py-2 duration-300 hover:bg-slate-500/20"
            onClick={setOriginal}
          >
            View Original
          </button>
        )}
      </div>
    </div>
  );
};

export default ScaleSelector;
