import { FC } from "react";
import { Food, FoodNutrients, NutrientsClasified } from "@/types/foodTypes";
import {
  getNutrientMeasurementUnit,
  getNutrientsClasified,
} from "@/utils/helpers";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/Modal/Modal";

interface Props {
  food: Food;
  handleClose: Function;
}

const FoodNutritionDetail: FC<Props> = ({ food, handleClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const nutrients: FoodNutrients = food.nutrients;
  const nutrientsClacified = getNutrientsClasified(nutrients);

  return (
    <Modal onClose={handleClose}>
      <section className="flex h-auto max-h-90vh w-auto min-w-full max-w-[95vw] flex-col overflow-hidden px-2 py-4">
        <span className="px-2 text-3xl font-medium">Detailed Nutrition</span>
        <div className="flex w-full justify-between px-2 pb-2 pt-4 text-xs font-medium s:text-sm sm:text-lg">
          <span className="flex basis-1/3 justify-start">Nutrient</span>
          <span className="flex basis-1/3 justify-end">Amount</span>
          <span className="flex basis-1/3 justify-end">Daily Value</span>
        </div>
        <div className="flex w-[40rem] max-w-full flex-col overflow-y-auto overflow-x-hidden px-2 text-xs s:text-sm sm:px-4">
          {NutrientsGroup(nutrientsClacified.principals)}
          <span className="mb-1 pt-3 text-xl font-semibold">Sugars</span>
          {NutrientsGroup(nutrientsClacified.sugars)}
          <span className="mb-1 pt-3 text-xl font-semibold">Fats</span>
          {NutrientsGroup(nutrientsClacified.fats)}
          <span className="mb-1 pt-3 text-xl font-semibold">Fatty Acids</span>
          {NutrientsGroup(nutrientsClacified.fatty_acids)}
          <span className="mb-1 pt-3 text-xl font-semibold">
            Vitamins and Minerals
          </span>

          {NutrientsGroup(nutrientsClacified.vitsAndMin)}
        </div>
      </section>
    </Modal>
  );
};

export default FoodNutritionDetail;

const NutrientsGroup = (nutrients: NutrientsClasified) => {
  const getNutrientData = (id: string) => {
    return getNutrientMeasurementUnit(id);
  };

  return (
    <>
      {Object.keys(nutrients).map((nut) => {
        const nutrientExtraData = getNutrientData(nut);
        const value = Number(nutrients[nut as keyof FoodNutrients]);
        const unit = nutrientExtraData?.unit;
        const requirement = nutrientExtraData?.requirement;
        const percentage =
          requirement && ((Number(value) / requirement) * 100).toFixed(2);
        return (
          <div className="flex w-full items-center justify-between" key={nut}>
            <span className="basis-1/3 capitalize">
              {nut.replaceAll("_", " ")}
            </span>
            <div className="flex basis-1/3 items-center justify-end gap-1">
              <span>{value ? value : "-"}</span>
              <span className="text-xs">{unit && value > 0 && unit}</span>
            </div>
            <span className="flex basis-1/3 items-center justify-end gap-1">
              <span>{value && Number(percentage) > 0 ? percentage : "-"}</span>
              <span className="text-xs">{Number(percentage) > 0 && "%"}</span>
            </span>
          </div>
        );
      })}
    </>
  );
};
