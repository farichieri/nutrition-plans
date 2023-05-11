import { Food, FoodGroup, FoodNutrients, Ingredient } from "@/types/foodTypes";
import { NewFoodNutrients } from "@/types/initialTypes";
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
          ? Number(food.nutrients[keyEv]) * servings
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

const getIngredientNutrition = (
  foodIngredient: Food,
  ingredient: Ingredient
) => {
  if (foodIngredient.nutrients) {
    const foodNutrition: FoodNutrients = getNutritionValues(
      foodIngredient,
      ingredient.amount,
      ingredient.weight_name
    );
    return foodNutrition;
  } else {
    return NewFoodNutrients;
  }
};

const getNutritionMerged = (
  ingredients: Ingredient[],
  foodIngredients: FoodGroup | null
): FoodNutrients => {
  if (
    !foodIngredients ||
    Object.keys(foodIngredients).length < 1 ||
    ingredients.length < 1
  ) {
    return NewFoodNutrients;
  }

  let result: any = Object.create({});

  ingredients.forEach((ingredient) => {
    const id = ingredient.food_id;
    if (id && foodIngredients) {
      const food = foodIngredients[id];
      if (food) {
        const ingredientNutrition: FoodNutrients = getIngredientNutrition(
          food,
          ingredient
        );
        for (let key in ingredientNutrition) {
          const value = result[key as keyof FoodNutrients];
          const newValue = ingredientNutrition[key as keyof FoodNutrients];
          if (key in result) {
            result[key as keyof FoodNutrients] =
              value + newValue > 0 ? formatToFixed(value + newValue) : null;
          } else {
            result[key as keyof FoodNutrients] = newValue;
          }
        }
      }
    }
  });
  return result;
};

const getNewAmount = (
  food: Food,
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

export { getNutritionValues, getNutritionMerged, getNewAmount };
