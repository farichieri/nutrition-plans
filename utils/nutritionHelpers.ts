import {
  Food,
  FoodGroup,
  FoodScales,
  IngredientGroup,
  Nutrients,
  NutrientsKeys,
  NutrientsT,
  NutritionMeasurements,
} from "@/features/foods/types";
import { DietMealGroup } from "@/features/plans";
import { formatToFixed, formatTwoDecimals } from "@/utils/format";
import { GRAMS_IN_ONE_OZ } from "@/constants";
import { getAllScales, orderScales } from "@/features/foods";
import { NewNutrients } from "@/features/foods";

const GRAMS = NutritionMeasurements.grams;
const OZ = NutritionMeasurements.oz;

const formatNutrient = (num: number, nutrient: NutrientsKeys): number => {
  if (nutrient === Nutrients.calories) {
    return formatToFixed(num);
  } else {
    const numF = formatTwoDecimals(num);
    return numF;
  }
};

const updateFoodScale = ({
  food,
  scaleAmount,
  scaleName,
}: {
  food: Food;
  scaleAmount: number;
  scaleName: string;
}): Food => {
  let newFood = { ...food };

  newFood.scaleAmount = scaleAmount;
  newFood.scaleName = scaleName;

  return newFood;
};

const getNutritionValues = (
  food: Food,
  scaleAmount: number,
  scaleName: string
): NutrientsT => {
  let nutrientsUpdated = { ...food.nutrients };

  for (let key in food.nutrients) {
    const keyEv = key as keyof NutrientsT;

    const updateByServing = (servings: number) => {
      nutrientsUpdated[keyEv] =
        nutrientsUpdated[keyEv] !== null
          ? formatNutrient(Number(food.nutrients[keyEv]) * servings, keyEv)
          : null;
    };
    if (scaleName === GRAMS) {
      const servings =
        (scaleAmount * Number(food.servingAmount)) / Number(food.servingGrams);
      updateByServing(servings);
    } else if (scaleName === OZ) {
      const servings =
        (scaleAmount * GRAMS_IN_ONE_OZ * Number(food.servingAmount)) /
        Number(food.servingGrams);
      updateByServing(servings);
    } else {
      const scale = food.scales.find((scale) => scale.scaleName === scaleName);
      const amount =
        scaleAmount / (Number(food.servingGrams) / Number(scale?.scaleGrams));
      updateByServing(amount);
    }
  }
  return nutrientsUpdated;
};

const getIngredientNutrition = (food: Food) => {
  if (food.nutrients && food.scaleAmount && food.scaleName) {
    const foodNutrition: NutrientsT = getNutritionValues(
      food,
      food.scaleAmount,
      food.scaleName
    );
    return foodNutrition;
  } else {
    return NewNutrients;
  }
};

const getNewAmount = ({
  new_scale_name,
  prev_scale_name,
  scaleAmount,
  scales,
}: {
  new_scale_name: string;
  prev_scale_name: string;
  scaleAmount: number;
  scales: FoodScales;
}): number => {
  const scale = scales.find((scale) => scale.scaleName === prev_scale_name);
  const newScale = scales.find((scale) => scale.scaleName === new_scale_name);
  switch (new_scale_name) {
    case GRAMS:
      return scaleAmount * Number(scale?.scaleGrams);
    case OZ:
      return (scaleAmount * Number(scale?.scaleGrams)) / GRAMS_IN_ONE_OZ;
    default:
      return (
        (scaleAmount / Number(newScale?.scaleGrams)) * Number(scale?.scaleGrams)
      );
  }
};

const getRecipeSize = (ingredients: IngredientGroup): number | null => {
  if (!ingredients) return null;
  let size = 0;
  Object.keys(ingredients).map((ing) => {
    const food = ingredients[ing];
    const scalesMerged = getAllScales({ scales: food.scales });
    if (food.scaleName && food.scaleAmount) {
      const equivalentInGrams = getNewAmount({
        scales: scalesMerged,
        prev_scale_name: food.scaleName,
        new_scale_name: GRAMS,
        scaleAmount: food.scaleAmount,
      });
      size += equivalentInGrams || 0;
    }
  });
  return size;
};

const getNutritionMerged = (foods: FoodGroup): NutrientsT => {
  if (Object.keys(foods).length < 1) {
    return NewNutrients;
  }

  let result: any = Object.create({});

  Object.keys(foods).forEach((id) => {
    const food = foods[id];
    if (id && food) {
      const ingredientNutrition: NutrientsT = getIngredientNutrition(food);
      for (let key in ingredientNutrition) {
        const value = result[key as keyof NutrientsT];
        const newValue = ingredientNutrition[key as keyof NutrientsT];
        if (key in result) {
          result[key as keyof NutrientsT] =
            value + newValue > 0 ? value + newValue : null;
        } else {
          result[key as keyof NutrientsT] = newValue;
        }
      }
    }
  });
  return result;
};

const getDietFoods = (meals: DietMealGroup): FoodGroup => {
  let result: FoodGroup = {};
  Object.keys(meals).map((meal_id) => {
    const diet_meal = meals[meal_id];
    const foods = diet_meal.foods;
    Object.keys(foods).map((id, index) => {
      result[meal_id + "_" + index] = foods[id];
    });
  });
  return result;
};

const getDietNutrition = (dietMeals: DietMealGroup) => {
  const foods = getDietFoods(dietMeals);
  const nutrition = getNutritionMerged(foods);
  return { ...nutrition };
};

export {
  getNutritionValues,
  getNutritionMerged,
  getNewAmount,
  getRecipeSize,
  getDietNutrition,
  getDietFoods,
  updateFoodScale,
};
