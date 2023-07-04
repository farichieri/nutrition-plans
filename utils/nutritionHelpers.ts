import {
  Food,
  FoodGroup,
  FoodNutrients,
  FoodScales,
  IngredientGroup,
  NutrientsEnum,
  NutritionMeasurements,
} from "@/features/foods/types";
import { DietMealGroup } from "@/features/plans";
import { formatToFixed, formatTwoDecimals } from "@/utils/format";
import { GRAMS_IN_ONE_OZ } from "@/constants";
import { mergeScales } from "@/features/foods";
import { NewFoodNutrients } from "@/types/initialTypes";

const GRAMS = NutritionMeasurements.grams;
const OZ = NutritionMeasurements.oz;

const formatNutrient = (num: number, nutrient: NutrientsEnum): number => {
  if (nutrient === NutrientsEnum.calories) {
    return formatToFixed(num);
  } else {
    const numF = formatTwoDecimals(num);
    return numF;
  }
};

const getNutritionValues = (
  food: Food,
  scale_amount: number,
  scale_name: string
): FoodNutrients => {
  let nutrientsUpdated = { ...food.nutrients };

  for (let key in food.nutrients) {
    const keyEv = key as keyof FoodNutrients;

    const updateByServing = (servings: number) => {
      nutrientsUpdated[keyEv] =
        nutrientsUpdated[keyEv] !== null
          ? formatNutrient(Number(food.nutrients[keyEv]) * servings, keyEv)
          : null;
    };
    if (scale_name === GRAMS) {
      const servings =
        (scale_amount * Number(food.serving_amount)) /
        Number(food.serving_grams);
      updateByServing(servings);
    } else if (scale_name === OZ) {
      const servings =
        (scale_amount * GRAMS_IN_ONE_OZ * Number(food.serving_amount)) /
        Number(food.serving_grams);
      updateByServing(servings);
    } else {
      const scale = food.scales.find(
        (scale) => scale.scale_name === scale_name
      );
      const amount =
        scale_amount /
        (Number(food.serving_grams) / Number(scale?.scale_grams));
      updateByServing(amount);
    }
  }
  return nutrientsUpdated;
};

const getIngredientNutrition = (food: Food) => {
  if (food.nutrients && food.scale_amount && food.scale_name) {
    const foodNutrition: FoodNutrients = getNutritionValues(
      food,
      food.scale_amount,
      food.scale_name
    );
    return foodNutrition;
  } else {
    return NewFoodNutrients;
  }
};

const getNewAmount = (
  scales: FoodScales,
  prev_scale_name: string,
  new_scale_name: string,
  scale_amount: number
): number | undefined => {
  const scale = scales.find((scale) => scale.scale_name === prev_scale_name);
  const newScale = scales.find((scale) => scale.scale_name === new_scale_name);
  switch (new_scale_name) {
    case GRAMS:
      return scale_amount * Number(scale?.scale_grams);
    case OZ:
      return (scale_amount * Number(scale?.scale_grams)) / GRAMS_IN_ONE_OZ;
    default:
      return (
        (scale_amount / Number(newScale?.scale_grams)) *
        Number(scale?.scale_grams)
      );
  }
};

const getRecipeSize = (ingredients: IngredientGroup): number | null => {
  if (!ingredients) return null;
  let size = 0;
  Object.keys(ingredients).map((ing) => {
    const food = ingredients[ing];
    const scalesMerged = mergeScales(food);
    if (food.scale_name && food.scale_amount) {
      const equivalentInGrams = getNewAmount(
        scalesMerged,
        food.scale_name,
        NutritionMeasurements.grams,
        food.scale_amount
      );
      size += equivalentInGrams || 0;
    }
  });
  return size;
};

const getNutritionMerged = (foods: FoodGroup): FoodNutrients => {
  if (Object.keys(foods).length < 1) {
    return NewFoodNutrients;
  }

  let result: any = Object.create({});

  Object.keys(foods).forEach((food_id) => {
    const food = foods[food_id];
    if (food_id && food) {
      const ingredientNutrition: FoodNutrients = getIngredientNutrition(food);
      for (let key in ingredientNutrition) {
        const value = result[key as keyof FoodNutrients];
        const newValue = ingredientNutrition[key as keyof FoodNutrients];
        if (key in result) {
          result[key as keyof FoodNutrients] =
            value + newValue > 0 ? value + newValue : null;
        } else {
          result[key as keyof FoodNutrients] = newValue;
        }
      }
    }
  });
  return result;
};

const getDietFoods = (diet_meals: DietMealGroup): FoodGroup => {
  let result: FoodGroup = {};
  Object.keys(diet_meals).map((meal_id) => {
    const diet_meal = diet_meals[meal_id];
    const foods = diet_meal.diet_meal_foods;
    Object.keys(foods).map((food_id, index) => {
      result[meal_id + "_" + index] = foods[food_id];
    });
  });
  return result;
};

const getDietNutrition = (dietMeals: DietMealGroup) => {
  const foods = getDietFoods(dietMeals);
  const nutrition = getNutritionMerged(foods);
  return nutrition;
};

export {
  getNutritionValues,
  getNutritionMerged,
  getNewAmount,
  getRecipeSize,
  getDietNutrition,
  getDietFoods,
};
