import { Food, FoodGroup, FoodNutrients, Ingredient } from "@/types/foodTypes";
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

const getNutritionMerged = (
  ingredients: Ingredient[],
  foodIngredients: FoodGroup
) => {
  let result: any = {};

  const getIngredientNutrition = (
    foodIngredient: Food,
    ingredient: Ingredient
  ) => {
    if (foodIngredient.nutrients) {
      const foodNutrition = getNutritionValues(
        foodIngredient,
        ingredient.amount,
        ingredient.weight_name
      );
      return foodNutrition;
    }
  };

  console.log(ingredients.length);
  console.log(Object.keys(foodIngredients).length);

  ingredients.map((ingredient) => {
    const id = ingredient.food_id;
    if (id && foodIngredients) {
      const food = foodIngredients[id];
      if (food) {
        const ingredientNutrition = getIngredientNutrition(food, ingredient);
        for (let key in ingredientNutrition) {
          if (key in result) {
            result[key] =
              result[key] + ingredientNutrition[key as keyof FoodNutrients];
          } else {
            result[key] = ingredientNutrition[key as keyof FoodNutrients];
          }
        }
      }
    }
  });

  return result;
};

export { getNutritionValues, getNutritionMerged };
