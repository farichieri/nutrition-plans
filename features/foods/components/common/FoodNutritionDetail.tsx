import {
  getNutrientMeasurementUnit,
  getNutrientsClasified,
} from "@/utils/helpers";
import { FC } from "react";
import { FoodNutrients, NutrientsClasified } from "@/features/foods";
import { formatTwoDecimals } from "@/utils";
import { VaulDrawer } from "@/components";

interface Props {
  nutrients: FoodNutrients;
  title?: string;
}

const titleClass =
  "mb-1 pt-3 text-xl font-semibold text-green-400 dark:text-green-300";

const FoodNutritionDetail: FC<Props> = ({ title, nutrients }) => {
  const nutrientsClasified = getNutrientsClasified(nutrients);

  return (
    <VaulDrawer title={title} btnText="Detailed Nutrition">
      <span className="px-2 text-3xl font-semibold text-blue-500 dark:text-blue-300">
        Detailed Nutrition
      </span>
      <div className="flex w-full justify-between border-b px-2 pb-2 pt-2 text-xs font-medium s:text-sm sm:text-lg">
        <span className="flex basis-1/3 justify-start">Nutrient</span>
        <span className="flex basis-1/3 justify-end">Amount</span>
        <span className="flex basis-1/3 justify-end">Daily Value</span>
      </div>
      <div className="flex w-[40rem] max-w-full flex-col divide-y overflow-y-auto overflow-x-hidden px-2 py-2 text-xs s:text-sm sm:px-4">
        <div>
          <span className={titleClass}>General</span>
          {NutrientsGroup(nutrientsClasified.principals)}
        </div>
        <div className="my-2 py-2">
          <span className={titleClass}>Sugars</span>
          {NutrientsGroup(nutrientsClasified.sugars)}
        </div>
        <div className="my-2 py-2">
          <span className={titleClass}>Fats</span>
          {NutrientsGroup(nutrientsClasified.fats)}
        </div>
        <div className="my-2 py-2">
          <span className={titleClass}>Vitamins and Minerals</span>
          {NutrientsGroup(nutrientsClasified.vitsAndMin)}
        </div>
      </div>
    </VaulDrawer>
  );
};

export default FoodNutritionDetail;

const NutrientsGroup = (nutrients: NutrientsClasified) => {
  const getNutrientData = (id: string) => {
    return getNutrientMeasurementUnit(id);
  };

  // sort nutrients alphabetically
  const sortedEntries = Object.entries(nutrients).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return (
    <>
      {sortedEntries.map((nut) => {
        const name = nut[0];
        const value = Number(nut[1]);

        const nutrientExtraData = getNutrientData(name);
        const num = formatTwoDecimals(value);
        const unit = nutrientExtraData?.unit;
        const requirement = nutrientExtraData?.requirement;
        const percentage =
          requirement && ((value / requirement) * 100).toFixed(2);

        return (
          <div className="flex w-full items-center justify-between" key={name}>
            <span className="basis-1/3 capitalize">
              {name.replaceAll("_", " ")}
            </span>
            <div className="flex basis-1/3 items-center justify-end gap-1">
              <span>{num ? num : "-"}</span>
              <span className="text-xs">{unit && num > 0 && unit}</span>
            </div>
            <span className="flex basis-1/3 items-center justify-end gap-1">
              <span>{num && Number(percentage) > 0 ? percentage : "-"}</span>
              <span className="text-xs">{Number(percentage) > 0 && "%"}</span>
            </span>
          </div>
        );
      })}
    </>
  );
};
