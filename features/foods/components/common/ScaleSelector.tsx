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
  const scalesMerged = mergeScales(food);
  const options = getScaleOptions(scalesMerged);
  const defaultScale = getDefaultScale(food.scales);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!food) return;
    const id = event.target.id;
    const value = event.target.value;

    let newAmount;
    let newScale;

    if (id === "scale_amount") {
      newAmount = Number(value);
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
      const { scale_amount, scale_name } = defaultScale;
      setLocalScale(scale_amount, scale_name);
    }
  };

  useEffect(() => {
    if (!food) return;
    if (
      scale_name !== defaultScale.scale_name ||
      scale_amount !== defaultScale.scale_amount
    ) {
      setIsNotOriginal(true);
    } else {
      setIsNotOriginal(false);
    }
  }, [scale_amount, scale_name]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-between gap-4">
        <NutritionInput
          changed={false}
          handleChange={handleChange}
          id={"scale_amount"}
          key={"scale_amount"}
          labelText={"Scale Amount"}
          name={"scale_amount"}
          min={"0"}
          title={""}
          type={"number"}
          value={Number(scale_amount)}
        />
        <FormSelect
          customClass={""}
          handleChange={handleChange}
          id={"scale_name"}
          labelText={"Scale name"}
          title={"Scale name"}
          options={options}
          value={scale_name}
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
