import { FoodGroup, FoodKind, mergeScales } from "@/features/foods";
import { getNewAmount } from "@/utils";
import { ShoppingListFoods } from "@/features/shopping";

const mergeFoodsWithSameScaleName = ({
  foods,
}: {
  foods: ShoppingListFoods;
}) => {
  const mergedFoods: ShoppingListFoods = {};

  Object.values(foods).forEach((food) => {
    const { id, scaleName, scaleAmount } = food;
    if (!id) return;

    if (!mergedFoods[id]) {
      mergedFoods[id] = food;
    } else {
      const newScaleName = mergedFoods[id].scaleName;
      const scalesMerged = mergeScales({ scales: food.scales });
      const amountUpdated = getNewAmount({
        new_scale_name: newScaleName,
        prev_scale_name: scaleName,
        scaleAmount: scaleAmount,
        scales: scalesMerged,
      });
      mergedFoods[id].scaleAmount += amountUpdated || 0;
    }
  });
  return mergedFoods;
};

const getShoppingFoods = ({
  foods,
}: {
  foods: FoodGroup;
}): ShoppingListFoods => {
  const list: ShoppingListFoods = {};

  Object.keys(foods).forEach((food_meal_id) => {
    const food = foods[food_meal_id];
    const { kind } = food;

    if (kind === FoodKind.recipe) {
      // Do not contemplate ingredients of ingredients
      const { ingredients } = food;
      Object.keys(ingredients).forEach((ingredient_id) => {
        const ingredient = ingredients[ingredient_id];
        list[food_meal_id + ingredient_id] = {
          category: ingredient.category!,
          id: ingredient.id!,
          imageURL: ingredient.imageURL,
          isCupboard: false,
          name: ingredient.name!,
          scaleAmount: ingredient.scaleAmount,
          scaleName: ingredient.scaleName,
          scales: ingredient.scales,
        };
      });
    } else if (kind === FoodKind.basic_food) {
      list[food_meal_id] = {
        category: food.category!,
        id: food.id!,
        imageURL: food.imageURL,
        isCupboard: false,
        name: food.name!,
        scaleAmount: food.scaleAmount,
        scaleName: food.scaleName,
        scales: food.scales,
      };
    }
  });

  const listMerged: ShoppingListFoods = mergeFoodsWithSameScaleName({
    foods: list,
  });

  return listMerged;
};

export default getShoppingFoods;
