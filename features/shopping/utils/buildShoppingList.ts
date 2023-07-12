import { FoodCategoriesEnum, mergeScales } from "@/features/foods";
import {
  ShoppingListFood,
  ShoppingListFoods,
  ShoppingListT,
} from "@/features/shopping";
import { getNewAmount } from "@/utils";

const getFoodDifference = ({
  shoppingFood,
  cupboardFood,
}: {
  shoppingFood: ShoppingListFood;
  cupboardFood: ShoppingListFood;
}): ShoppingListFood => {
  const scalesMerged = mergeScales({ scales: cupboardFood.scales });
  const amountUpdated = getNewAmount({
    new_scale_name: shoppingFood.scaleName,
    prev_scale_name: cupboardFood.scaleName,
    scaleAmount: cupboardFood.scaleAmount,
    scales: scalesMerged,
  });

  return {
    ...shoppingFood,
    scaleAmount: shoppingFood.scaleAmount - amountUpdated,
  };
};

const buildShoppingList = ({
  foods,
  cupboard,
}: {
  foods: ShoppingListFoods;
  cupboard: ShoppingListFoods;
}): ShoppingListT => {
  const foodCategories = Object.keys(FoodCategoriesEnum);
  const list: ShoppingListT = {};

  console.log({ foods });
  foodCategories.forEach((category: string) => {
    list[category] = {};
  });

  Object.keys(foods).forEach((food_meal_id) => {
    const food = foods[food_meal_id];
    const cupboardFood = cupboard[food_meal_id];

    if (cupboardFood) {
      const difference = getFoodDifference({
        shoppingFood: food,
        cupboardFood: cupboardFood,
      });
      console.log({ food, cupboardFood, difference });
    }

    list[food.category!][food_meal_id] = {
      category: food.category!,
      id: food.id!,
      imageURL: food.imageURL,
      isCupboard: false,
      name: food.name!,
      scaleAmount: food.scaleAmount,
      scaleName: food.scaleName,
      scales: food.scales,
    };
  });

  return list;
};

export default buildShoppingList;
