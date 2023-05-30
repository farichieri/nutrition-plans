import { FC, useEffect, useState } from "react";
import { Food, NutritionMeasurements } from "@/types/foodTypes";
import { getNewAmount } from "../../../utils/nutritionHelpers";
import { useRouter } from "next/router";
import NutritionInput from "@/components/Form/NutritionInput";
import Select from "@/components/Form/Select";

interface Props {
  food: Food;
  amount: number;
  scale: string;
}

const ScaleSelector: FC<Props> = ({ food, amount, scale }) => {
  const [isNotOriginal, setIsNotOriginal] = useState(false);
  const router = useRouter();
  const GRAMS = NutritionMeasurements.grams;
  const OZ = NutritionMeasurements.oz;
  const options = [food?.serving_name || "", GRAMS, OZ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!food) return;
    const id = event.target.id;
    const value = event.target.value;
    if (id === "scale_amount") {
      router.replace({
        pathname: router.pathname,
        query: {
          id: router.query.id,
          amount: value,
          scale: scale || food.scale_name,
        },
      });
    }
    if (id === "scale_name") {
      const newAmount = getNewAmount(food, scale, value, amount);
      router.replace({
        pathname: router.pathname,
        query: {
          id: router.query.id,
          amount: newAmount || food.scale_amount,
          scale: value,
        },
      });
    }
  };

  const setOriginal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!food) return;
    router.replace({
      pathname: router.pathname,
      query: {
        id: router.query.id,
        amount: food.scale_amount,
        scale: food.scale_name,
      },
    });
  };

  useEffect(() => {
    if (!food) return;
    const OzAndServingToGrams = getNewAmount(food, scale, GRAMS, amount);
    if (scale === GRAMS) {
      if (amount !== food.serving_grams) {
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
  }, [amount, scale]);

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
          value={Number(amount)}
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
          value={String(scale)}
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
