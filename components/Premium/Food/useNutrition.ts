import { Food, FoodNutrients } from "@/types/foodTypes";
import { GRAMS_IN_ONE_OZ } from "@/utils/constants";
import { formatToFixed } from "@/utils/format";

const getNutritionValues = (
  food: Food,
  amount: number,
  weightName: string
): FoodNutrients => {
  let nutrientsUpdated = { ...food.nutrients };

  for (let key in food.nutrients) {
    const keyEv = key as keyof FoodNutrients;

    const updateByServing = (servings: number) => {
      nutrientsUpdated[keyEv] =
        nutrientsUpdated[keyEv] !== null
          ? formatToFixed(Number(food.nutrients[keyEv]) * servings)
          : null;
    };
    if (weightName === food.serving_name) {
      updateByServing(amount);
    } else if (weightName === "grams") {
      const servings =
        (amount * Number(food.serving_amount)) / Number(food.serving_grams);
      updateByServing(servings);
    } else if (weightName === "oz") {
      const servings =
        (amount * GRAMS_IN_ONE_OZ * Number(food.serving_amount)) /
        Number(food.serving_grams);
      updateByServing(servings);
    }
  }

  return nutrientsUpdated;
};

export { getNutritionValues };
