import {
  getNutrientMeasurementUnit,
  getNutrientsClasified,
} from "@/utils/helpers";
import { FC, useState } from "react";
import { FoodNutrients, NutrientsClasified } from "@/features/foods";
import Modal from "@/components/Modal/Modal";
import { formatTwoDecimals } from "@/utils";
import { Drawer } from "vaul";
import { useWindowWidth } from "@/hooks";

interface Props {
  nutrients: FoodNutrients;
}

const FoodNutritionDetail: FC<Props> = ({ nutrients }) => {
  const nutrientsClasified = getNutrientsClasified(nutrients);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;
  const [openDetails, setOpenDetails] = useState(false);

  const handleClose = () => {
    setOpenDetails(false);
  };

  const handleOpenDetail = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenDetails(true);
  };

  return (
    <>
      {isMobile ? (
        <Drawer.Root shouldScaleBackground>
          <Drawer.Trigger asChild>
            <button className="m-auto rounded-3xl border px-4 py-2 duration-300 hover:bg-slate-500/20">
              Detailed Nutrition
            </button>
          </Drawer.Trigger>
          <Drawer.Overlay className="fixed inset-0 z-[9999] bg-black/40" />
          <Drawer.Portal>
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[9999] mt-36 flex h-[96%] flex-col rounded-t-[10px] bg-tertiary-color">
              <div className="flex w-auto min-w-full flex-col overflow-hidden px-2 py-4">
                <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
                <span className="px-2 text-3xl font-medium">
                  Detailed Nutrition
                </span>
                <div className="flex w-full justify-between border-b px-2 pb-2 pt-2 text-xs font-medium s:text-sm sm:text-lg">
                  <span className="flex basis-1/3 justify-start">Nutrient</span>
                  <span className="flex basis-1/3 justify-end">Amount</span>
                  <span className="flex basis-1/3 justify-end">
                    Daily Value
                  </span>
                </div>
                <div className="flex w-[40rem] max-w-full flex-col overflow-y-auto overflow-x-hidden px-2 py-2 text-xs s:text-sm sm:px-4">
                  {NutrientsGroup(nutrientsClasified.principals)}
                  <span className="mb-1 pt-3 text-xl font-semibold">
                    Sugars
                  </span>
                  {NutrientsGroup(nutrientsClasified.sugars)}
                  <span className="mb-1 pt-3 text-xl font-semibold">Fats</span>
                  {NutrientsGroup(nutrientsClasified.fats)}
                  <span className="mb-1 pt-3 text-xl font-semibold">
                    Fatty Acids
                  </span>
                  {NutrientsGroup(nutrientsClasified.fatty_acids)}
                  <span className="mb-1 pt-3 text-xl font-semibold">
                    Vitamins and Minerals
                  </span>

                  {NutrientsGroup(nutrientsClasified.vitsAndMin)}
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <>
          <button
            className="m-auto rounded-3xl border px-4 py-2 duration-300 hover:bg-slate-500/20"
            onClick={handleOpenDetail}
          >
            Detailed Nutrition
          </button>
          {openDetails && (
            <Modal onClose={handleClose}>
              <section className="flex h-auto max-h-[90vh] w-auto min-w-full max-w-[95vw] flex-col overflow-hidden px-2 py-4">
                <span className="px-2 text-3xl font-medium">
                  Detailed Nutrition
                </span>
                <div className="flex w-full justify-between border-b px-2 pb-2 pt-2 text-xs font-medium s:text-sm sm:text-lg">
                  <span className="flex basis-1/3 justify-start">Nutrient</span>
                  <span className="flex basis-1/3 justify-end">Amount</span>
                  <span className="flex basis-1/3 justify-end">
                    Daily Value
                  </span>
                </div>
                <div className="flex w-[40rem] max-w-full flex-col overflow-y-auto overflow-x-hidden px-2 py-2 text-xs s:text-sm sm:px-4">
                  {NutrientsGroup(nutrientsClasified.principals)}
                  <span className="mb-1 pt-3 text-xl font-semibold">
                    Sugars
                  </span>
                  {NutrientsGroup(nutrientsClasified.sugars)}
                  <span className="mb-1 pt-3 text-xl font-semibold">Fats</span>
                  {NutrientsGroup(nutrientsClasified.fats)}
                  <span className="mb-1 pt-3 text-xl font-semibold">
                    Fatty Acids
                  </span>
                  {NutrientsGroup(nutrientsClasified.fatty_acids)}
                  <span className="mb-1 pt-3 text-xl font-semibold">
                    Vitamins and Minerals
                  </span>

                  {NutrientsGroup(nutrientsClasified.vitsAndMin)}
                </div>
              </section>
            </Modal>
          )}
        </>
      )}
    </>
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
        const value = formatTwoDecimals(
          Number(nutrients[nut as keyof FoodNutrients])
        );
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
