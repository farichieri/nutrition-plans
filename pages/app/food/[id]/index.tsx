import { FoodGroup, FoodNutrients } from "@/types/foodTypes";
import { formatToFixed } from "@/utils/format";
import { GRAMS_IN_ONE_OZ } from "@/utils/constants";
import { selectFoodsSlice } from "@/store/slices/foodsSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import BackButton from "@/components/Back/BackButton";
import FoodNutritionDetail from "@/components/Premium/Food/FoodNutritionDetail";
import Image from "next/image";
import Link from "next/link";
import NutritionInput from "@/components/Form/NutritionInput";
import PieGraph from "@/components/PieGraph/PieGraph";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import Select from "@/components/Form/Select";
import FoodActions from "@/components/Premium/Food/FoodActions/FoodActions";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const { foodsSearched } = useSelector(selectFoodsSlice);
  const food = foodsSearched[id as keyof FoodGroup];
  const options = [food.serving_name || "", "grams", "oz"];
  const [nutrients, setNutrients] = useState(food.nutrients);
  const [openDetails, setOpenDetails] = useState(false);
  const [amountSelected, setAmountSelected] = useState<number>(
    food.serving_amount || 1
  );
  const [weightSelected, setWeightSelected] = useState<string>(
    food.serving_name || ""
  );
  const [isNotOriginal, setIsNotOriginal] = useState(false);

  const updateValues = async () => {
    let nutrientsUpdated = { ...nutrients };
    for (let key in food.nutrients) {
      const keyEv = key as keyof FoodNutrients;

      const updateByServing = (servings: number) => {
        nutrientsUpdated[keyEv] =
          nutrientsUpdated[keyEv] !== null
            ? formatToFixed(Number(food.nutrients[keyEv]) * servings)
            : null;
      };
      if (weightSelected === food.serving_name) {
        updateByServing(amountSelected);
      } else if (weightSelected === "grams") {
        const servings =
          (amountSelected * Number(food.serving_amount)) /
          Number(food.serving_grams);
        updateByServing(servings);
      } else if (weightSelected === "oz") {
        const servings =
          (amountSelected * GRAMS_IN_ONE_OZ * Number(food.serving_amount)) /
          Number(food.serving_grams);
        updateByServing(servings);
      }
    }
    setNutrients(nutrientsUpdated);
  };

  const getNewAmountSelected = (
    prevWeightSelected: string,
    newWeightSelected: string,
    weightAmount: number
  ): number | undefined => {
    if (prevWeightSelected === "grams") {
      if (newWeightSelected === "oz") {
        return weightAmount / GRAMS_IN_ONE_OZ;
      } else if (newWeightSelected === food.serving_name) {
        return (
          (weightAmount * Number(food.serving_amount)) /
          Number(food.serving_grams)
        );
      }
    } else if (prevWeightSelected === "oz") {
      if (newWeightSelected === "grams") {
        return weightAmount * GRAMS_IN_ONE_OZ;
      } else if (newWeightSelected === food.serving_name) {
        return (
          (weightAmount * GRAMS_IN_ONE_OZ * Number(food.serving_amount)) /
          Number(food.serving_grams)
        );
      }
    } else if (prevWeightSelected === food.serving_name) {
      if (newWeightSelected === "grams") {
        return (
          (weightAmount * Number(food.serving_grams)) /
          Number(food.serving_amount)
        );
      } else if (newWeightSelected === "oz") {
        return (
          (weightAmount * Number(food.serving_grams)) /
          Number(food.serving_amount) /
          GRAMS_IN_ONE_OZ
        );
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const id = event.target.id;
    const value = event.target.value;
    if (id === "serving_amount") {
      setAmountSelected(Number(value));
    } else if (id === "weight_amount") {
      const newAmountSelected = getNewAmountSelected(
        weightSelected,
        value,
        amountSelected
      );
      newAmountSelected && setAmountSelected(newAmountSelected);
      setWeightSelected(value);
    }
  };
  useEffect(() => {
    updateValues();

    const OzAndServingToGrams = getNewAmountSelected(
      weightSelected,
      "grams",
      amountSelected
    );

    if (weightSelected === "grams") {
      if (amountSelected !== food.serving_grams) {
        setIsNotOriginal(true);
      }
    } else {
      setIsNotOriginal(false);
    }

    if (
      weightSelected !== "grams" &&
      OzAndServingToGrams !== food.serving_grams
    ) {
      setIsNotOriginal(true);
    }
  }, [amountSelected, weightSelected]);

  const handleOpenDetails = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenDetails(true);
  };

  const handleClose = () => {
    setOpenDetails(false);
  };

  const setOriginal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let originalValue = getNewAmountSelected(
      "grams",
      weightSelected,
      Number(food.serving_grams)
    );
    if (weightSelected === "grams") {
      originalValue = Number(food.serving_grams);
    }
    setAmountSelected(Number(originalValue));
    setIsNotOriginal(false);
  };

  return (
    <PremiumLayout>
      {openDetails && (
        <FoodNutritionDetail nutrients={nutrients} handleClose={handleClose} />
      )}
      {food && (
        <section className="flex w-full flex-col gap-14 pb-24 pt-4">
          <div className="flex max-w-lg flex-col gap-10 ">
            <div className="fixed left-auto top-[var(--nav-h)] z-[60] flex w-full items-center gap-10 px-2 py-2 backdrop-blur-lg">
              <BackButton />
              <span className="text-3xl font-semibold">{food.food_name}</span>
            </div>
          </div>
          <div className="flex w-full flex-wrap items-start gap-10 p-4 sm:px-10">
            <div className="flex-col] flex w-full max-w-lg flex-col gap-5">
              <Image
                src={food.image}
                alt={`${food.food_name}`}
                width={250}
                height={250}
                className="w-50 pt-[var(--nav-h) m-auto mb-5 rounded-lg"
              />
              {food.food_id && <FoodActions foodID={food.food_id} />}
              <div className="flex flex-col">
                <NutritionInput
                  customClass={""}
                  handleChange={handleChange}
                  id={"serving_amount"}
                  isRequired={false}
                  key={"serving_amount"}
                  labelFor={"serving_amount"}
                  labelText={"Scale Amount"}
                  max={""}
                  min={"0"}
                  name={"serving_amount"}
                  pattern={""}
                  placeholder={""}
                  step={"1`"}
                  title={""}
                  type={"number"}
                  value={amountSelected}
                  unit={""}
                />
                <Select
                  customClass={""}
                  handleChange={handleChange}
                  id={"weight_amount"}
                  isRequired={false}
                  labelFor={"Amount"}
                  labelText={"Scale type"}
                  name={"amount"}
                  placeholder={"asdasdasd"}
                  title={"Scale Type"}
                  options={options}
                  value={weightSelected}
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
            <div className="flex w-full max-w-lg flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">Nutrition Values</span>
                {food.source && (
                  <div className="flex items-center gap-1">
                    <span>Source:</span>
                    <Link
                      href={"https://www.usda.gov/"}
                      target="_blank"
                      className="text-green-500 opacity-50 duration-300 hover:opacity-100"
                    >
                      {food.source}
                    </Link>
                  </div>
                )}
              </div>
              <PieGraph
                calories={nutrients.calories}
                carbohydrates={nutrients.carbohydrates}
                fats={nutrients.fats}
                proteins={nutrients.proteins}
              />
              <div className="flex flex-col gap-4">
                <span>
                  For {formatToFixed(amountSelected)} {weightSelected}
                </span>
                <div className="flex flex-col">
                  <div className="flex w-full justify-between">
                    <span>Calories:</span>
                    <span>{nutrients.calories}</span>
                  </div>
                  <div className="flex w-full justify-between">
                    <span>Carbs:</span>
                    <span>{nutrients.carbohydrates}</span>
                  </div>
                  <div className="flex w-full justify-between">
                    <span>Fats:</span>
                    <span>{nutrients.fats}</span>
                  </div>
                  <div className="flex w-full justify-between">
                    <span>Proteins:</span>
                    <span>{nutrients.proteins}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex w-full justify-between">
                  <span>Fiber:</span>
                  <span>{nutrients.fiber || "-"}</span>
                </div>
                <div className="flex w-full justify-between">
                  <span>Net carbs:</span>
                  <span>
                    {Number(nutrients.carbohydrates) - Number(nutrients.fiber)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex w-full justify-between">
                  <span>Sodium:</span>
                  <span>{nutrients.sodium || "-"}</span>
                </div>
                <div className="flex w-full justify-between">
                  <span>Cholesterol:</span>
                  <span>{nutrients.cholesterol || "-"}</span>
                </div>
              </div>
              <button
                className="m-auto rounded-3xl border px-4 py-2 duration-300 hover:bg-slate-500/20"
                onClick={handleOpenDetails}
              >
                Detailed Nutrition
              </button>
            </div>
          </div>
        </section>
      )}
    </PremiumLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
