import {
  Food,
  getDefaultScale,
  getScaleOptions,
  mergeScales,
} from "@/features/foods";
import { FC, useEffect, useState } from "react";
import { getNewAmount } from "@/utils";
import { useRouter } from "next/router";
import NutritionInput from "@/components/Form/NutritionInput";
import FormSelect from "@/components/Form/FormSelect";

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
  const scalesMerged = mergeScales({ scales: food.scales });
  const options = getScaleOptions(scalesMerged);
  const defaultScale = getDefaultScale(food.scales);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      newAmount = getNewAmount({
        scales: scalesMerged,
        prev_scale_name: scaleName,
        new_scale_name: value,
        scaleAmount,
      });
      newScale = value;
    }
    if (updateRoute) {
      router.replace({
        pathname: router.pathname,
        query: {
          id: router.query.id,
          amount: newAmount,
          scale: newScale,
        },
      });
    } else {
      setLocalScale(newAmount, newScale);
    }
  };

  const setOriginal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!food) return;

    if (updateRoute) {
      router.replace({
        pathname: router.pathname,
        query: {
          id: router.query.id,
        },
      });
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
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-between gap-4">
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
