import {
  selectCreateRecipeSlice,
  setIngredientOpened,
  setRecipeState,
} from "@/store/slices/createRecipeSlice";
import { Food, Ingredient } from "@/types/foodTypes";
import { formatToFixed } from "@/utils/format";
import { getNewAmount, getNutritionValues } from "./useNutrition";
import { selectFoodsSlice, setScale } from "@/store/slices/foodsSlice";
import { useDispatch, useSelector } from "react-redux";
import FoodNutritionDetail from "./FoodNutritionDetail";
import Link from "next/link";
import NutritionInput from "@/components/Form/NutritionInput";
import PieGraph from "@/components/PieGraph/PieGraph";
import React, { FC, useEffect, useState } from "react";
import Select from "@/components/Form/Select";

interface Props {
  foodProp: Food;
  isIngredient: boolean;
}

const FoodNutrition: FC<Props> = ({ isIngredient }) => {
  const dispatch = useDispatch();
  const { recipeState } = useSelector(selectCreateRecipeSlice);
  const { food } = useSelector(selectFoodsSlice);
  const foodData = food?.data;
  const amount = food?.scale?.amount;
  const weightName = food?.scale?.weightName;

  const options = [foodData?.serving_name || "", "grams", "oz"];
  const [openDetails, setOpenDetails] = useState(false);
  const [isNotOriginal, setIsNotOriginal] = useState(false);

  const [nutrients, setNutrients] = useState(foodData?.nutrients);
  // const [amount, setAmount] = useState<number>(foodData?.serving_amount || 1);
  // const [weightName, setWeightName] = useState<string>(
  //   foodData?.serving_name || ""
  // );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!foodData) return;
    const id = event.target.id;
    const value = event.target.value;
    if (id === "serving_amount") {
      dispatch(setScale({ amount: Number(value), weightName: weightName }));
    } else if (id === "weight_amount") {
      const newAmountSelected = getNewAmount(
        foodData,
        weightName,
        value,
        amount
      );
      newAmountSelected &&
        dispatch(setScale({ amount: newAmountSelected, weightName: value }));
    }
  };

  const setOriginal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!foodData) return;
    let originalValue = getNewAmount(
      foodData,
      "grams",
      weightName,
      Number(foodData.serving_grams)
    );
    if (weightName === "grams") {
      originalValue = Number(foodData.serving_grams);
    }
    dispatch(
      setScale({ amount: Number(originalValue), weightName: weightName })
    );
    setIsNotOriginal(false);
  };

  useEffect(() => {
    if (!foodData) return;
    dispatch(
      setScale({
        amount: foodData.serving_amount || 1,
        weightName: foodData.serving_name || "",
      })
    );
    setNutrients(foodData.nutrients);
  }, []);

  useEffect(() => {
    if (!foodData) return;
    const nutrientsUpdated = getNutritionValues(foodData, amount, weightName);
    setNutrients(nutrientsUpdated);

    const OzAndServingToGrams = getNewAmount(
      foodData,
      weightName,
      "grams",
      amount
    );

    if (weightName === "grams") {
      if (amount !== foodData.serving_grams) {
        setIsNotOriginal(true);
      }
    } else {
      setIsNotOriginal(false);
    }

    if (
      weightName !== "grams" &&
      OzAndServingToGrams !== foodData.serving_grams
    ) {
      setIsNotOriginal(true);
    }
  }, [amount, weightName]);

  const handleOpenDetail = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenDetails(true);
  };

  const handleIngredient = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!foodData) return;
    event.preventDefault();
    const newIngredient: Ingredient = {
      amount: amount,
      food_id: foodData.food_id || "",
      order: 0,
      text: "",
      weight_name: weightName,
    };
    dispatch(
      setRecipeState({
        ...recipeState,
        ingredients: [...recipeState.ingredients, newIngredient],
      })
    );
    dispatch(setIngredientOpened(null));
  };

  if (!foodData || !nutrients || !amount || !weightName) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full max-w-xl flex-wrap items-start gap-10">
      {openDetails && (
        <FoodNutritionDetail
          nutrients={nutrients}
          handleClose={() => setOpenDetails(false)}
        />
      )}
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full max-w-md items-center justify-between gap-2">
          <NutritionInput
            handleChange={handleChange}
            id={"serving_amount"}
            isRequired={false}
            key={"serving_amount"}
            labelFor={"serving_amount"}
            labelText={"Scale Amount"}
            min={"0"}
            name={"serving_amount"}
            step={"1"}
            title={""}
            type={"number"}
            value={amount}
          />
          <Select
            customClass={""}
            handleChange={handleChange}
            id={"weight_amount"}
            isRequired={false}
            labelFor={"Amount"}
            labelText={"Scale type"}
            name={"amount"}
            title={"Scale Type"}
            options={options}
            value={weightName}
          />
        </div>
        {isIngredient && (
          <button
            onClick={handleIngredient}
            className="m-auto flex w-fit items-center gap-1 rounded-3xl border bg-green-600 py-1.5 pl-2 pr-4 duration-300 hover:bg-green-500 active:scale-95"
          >
            <span className="material-icons">add</span>
            <span>Add</span>
          </button>
        )}

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
        <div className="flex items-center gap-2">
          <span className="material-icons-outlined text-green-500">
            data_usage
          </span>
          <span className="text-2xl font-semibold">Nutrition Values</span>
          {foodData.source && (
            <div className="flex items-center gap-1">
              <span>Source:</span>
              <Link
                href={"https://www.usda.gov/"}
                target="_blank"
                className="text-green-500 opacity-50 duration-300 hover:opacity-100"
              >
                {foodData.source}
              </Link>
            </div>
          )}
        </div>
        <PieGraph nutrients={nutrients} />
        <div className="flex flex-col gap-4">
          <span>
            For {formatToFixed(amount)} {weightName}
          </span>
          <div className="flex flex-col">
            <div className="flex w-full justify-between">
              <span>Calories:</span>
              <span>{nutrients.calories || "-"}</span>
            </div>
            <div className="flex w-full justify-between">
              <span>Carbs:</span>
              <span>{nutrients.carbohydrates || "-"}</span>
            </div>
            <div className="flex w-full justify-between">
              <span>Fats:</span>
              <span>{nutrients.fats || "-"}</span>
            </div>
            <div className="flex w-full justify-between">
              <span>Proteins:</span>
              <span>{nutrients.proteins || "-"}</span>
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
              {Number(nutrients.carbohydrates) - Number(nutrients.fiber) || "-"}
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
          onClick={handleOpenDetail}
        >
          Detailed Nutrition
        </button>
      </div>
    </div>
  );
};

export default FoodNutrition;
