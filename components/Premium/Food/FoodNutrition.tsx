import { fetchFoodByID } from "@/firebase/helpers/Food";
import { Food, Ingredient } from "@/types/foodTypes";
import { formatToFixed } from "@/utils/format";
import { getNutritionValues } from "./useNutrition";
import { GRAMS_IN_ONE_OZ } from "@/utils/constants";
import { NewFood } from "@/types/initialTypes";
import { useRouter } from "next/router";
import FoodNutritionDetail from "./FoodNutritionDetail";
import Link from "next/link";
import NutritionInput from "@/components/Form/NutritionInput";
import PieGraph from "@/components/PieGraph/PieGraph";
import React, { FC, useEffect, useState } from "react";
import Select from "@/components/Form/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCreateRecipeSlice,
  setIngredientOpened,
  setRecipeState,
} from "@/store/slices/createRecipeSlice";

interface Props {
  foodProp: Food;
  isIngredient: boolean;
}

// Yo tengo q hacer una funcion en la cual al pasarle el Food, el amount y el scale me devuelva el foodUpdated

const FoodNutrition: FC<Props> = ({ foodProp, isIngredient }) => {
  const router = useRouter();
  const { recipeState } = useSelector(selectCreateRecipeSlice);
  const dispatch = useDispatch();
  const { id } = router.query;
  const [food, setFood] = useState(foodProp || NewFood);
  const options = [food?.serving_name || "", "grams", "oz"];
  const [nutrients, setNutrients] = useState(food?.nutrients);
  const [openDetails, setOpenDetails] = useState(false);
  const [amount, setAmount] = useState<number>(food?.serving_amount || 1);
  const [weightName, setWeightName] = useState<string>(
    food?.serving_name || ""
  );
  const [isNotOriginal, setIsNotOriginal] = useState(false);
  const getNewAmount = (
    prevWeightName: string,
    newWeightName: string,
    weight: number
  ): number | undefined => {
    switch (prevWeightName) {
      case "grams":
        if (newWeightName === "oz") {
          return weight / GRAMS_IN_ONE_OZ;
        } else if (newWeightName === food.serving_name) {
          return (
            (weight * Number(food.serving_amount)) / Number(food.serving_grams)
          );
        }
        break;
      case "oz":
        if (newWeightName === "grams") {
          return weight * GRAMS_IN_ONE_OZ;
        } else if (newWeightName === food.serving_name) {
          return (
            (weight * GRAMS_IN_ONE_OZ * Number(food.serving_amount)) /
            Number(food.serving_grams)
          );
        }
        break;
      case food.serving_name:
        if (newWeightName === "grams") {
          return (
            (weight * Number(food.serving_grams)) / Number(food.serving_amount)
          );
        } else if (newWeightName === "oz") {
          return (
            (weight * Number(food.serving_grams)) /
            Number(food.serving_amount) /
            GRAMS_IN_ONE_OZ
          );
        }
      default:
        break;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const id = event.target.id;
    const value = event.target.value;
    if (id === "serving_amount") {
      setAmount(Number(value));
    } else if (id === "weight_amount") {
      const newAmountSelected = getNewAmount(weightName, value, amount);
      newAmountSelected && setAmount(newAmountSelected);
      setWeightName(value);
    }
  };

  const setOriginal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let originalValue = getNewAmount(
      "grams",
      weightName,
      Number(food.serving_grams)
    );
    if (weightName === "grams") {
      originalValue = Number(food.serving_grams);
    }
    setAmount(Number(originalValue));
    setIsNotOriginal(false);
  };

  useEffect(() => {
    if (!food.food_id && typeof id === "string") {
      const fetchFoodID = async () => {
        const foodFetched: Food | null = await fetchFoodByID(id);
        foodFetched && setFood(foodFetched);
        foodFetched && setNutrients(foodFetched.nutrients);
      };
      fetchFoodID();
    }
  }, []);

  useEffect(() => {
    const nutrientsUpdated = getNutritionValues(food, amount, weightName);
    setNutrients(nutrientsUpdated);

    const OzAndServingToGrams = getNewAmount(weightName, "grams", amount);

    if (weightName === "grams") {
      if (amount !== food.serving_grams) {
        setIsNotOriginal(true);
      }
    } else {
      setIsNotOriginal(false);
    }

    if (weightName !== "grams" && OzAndServingToGrams !== food.serving_grams) {
      setIsNotOriginal(true);
    }
  }, [amount, weightName]);

  const handleOpenDetail = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenDetails(true);
  };

  const handleIngredient = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newIngredient: Ingredient = {
      amount: amount,
      food_id: food.food_id || "",
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

  return (
    <div className="flex w-full max-w-xl flex-wrap items-start p-4 sm:px-10">
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
