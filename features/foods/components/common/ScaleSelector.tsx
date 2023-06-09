import {
  Food,
  NutritionMeasurements,
  getDefaultScale,
  getScaleOptions,
  mergeScales,
} from "@/features/foods";
import { FC, useEffect, useState } from "react";
import { getNewAmount } from "../../../../utils/nutritionHelpers";
import { useRouter } from "next/router";
import NutritionInput from "@/components/Form/NutritionInput";
import Select from "@/components/Form/Select";

interface Props {
  food: Food;
  scale_amount: number;
  scale_name: string;
  updateRoute: boolean;
  setLocalScale: Function;
}

const ScaleSelector: FC<Props> = ({
  food,
  scale_amount,
  scale_name,
  updateRoute,
  setLocalScale,
}) => {
  const [isNotOriginal, setIsNotOriginal] = useState(false);
  const router = useRouter();
  const GRAMS = NutritionMeasurements.grams;
  const scalesMerged = mergeScales(food);
  const options = getScaleOptions(scalesMerged);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!food) return;
    const id = event.target.id;
    const value = event.target.value;

    let newAmount;
    let newScale;

    if (id === "scale_amount") {
      newAmount = value;
      newScale = scale_name;
    }
    if (id === "scale_name") {
      newAmount = getNewAmount(scalesMerged, scale_name, value, scale_amount);
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
      const defaultScale = getDefaultScale(food.scales);
      const { scale_amount, scale_name } = defaultScale;
      setLocalScale(scale_amount, scale_name);
    }
  };

  useEffect(() => {
    // Improve.
    if (!food) return;
    const OzAndServingToGrams = getNewAmount(
      scalesMerged,
      scale_name,
      GRAMS,
      scale_amount
    );
    if (scale_name === GRAMS) {
      if (scale_amount !== food.serving_grams) {
        setIsNotOriginal(true);
      } else {
        setIsNotOriginal(false);
      }
    } else {
      if (OzAndServingToGrams !== food.serving_grams) {
        setIsNotOriginal(true);
      } else {
        setIsNotOriginal(false);
      }
    }
  }, [scale_amount, scale_name]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-between gap-2">
        <NutritionInput
          handleChange={handleChange}
          id={"scale_amount"}
          isRequired={false}
          key={"scale_amount"}
          labelFor={"scale_amount"}
          labelText={"Scale Amount"}
          min={"0"}
          name={"scale_amount"}
          step={"1"}
          title={""}
          type={"number"}
          value={Number(Number(scale_amount).toFixed(2))}
        />
        <Select
          customClass={""}
          handleChange={handleChange}
          id={"scale_name"}
          isRequired={false}
          labelFor={"Amount"}
          labelText={"Scale name"}
          name={"scale_name"}
          title={"Scale name"}
          options={options}
          value={scale_name}
        />
      </div>
      <div className="flex h-10 justify-center">
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
