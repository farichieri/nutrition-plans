import {
  ShoppingListFood,
  ShoppingListFoods,
  ShoppingListT,
} from "@/features/shopping";
import { FoodCategoriesEnum } from "@/features/foods";
import { getNewAmount } from "@/utils";

// Get difference between shopping list food and cupboard food
const getFoodDifference = ({
  shoppingFood,
  cupboardFood,
}: {
  shoppingFood: ShoppingListFood;
  cupboardFood: ShoppingListFood;
}): ShoppingListFood => {
  const amountUpdated = getNewAmount({
    new_scale_name: shoppingFood.scaleName,
    prev_scale_name: cupboardFood.scaleName,
    scaleAmount: cupboardFood.scaleAmount,
    scales: cupboardFood.scales,
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
    const shoppingFood = foods[food_meal_id];
    const cupboardFood = cupboard[food_meal_id];

    if (cupboardFood) {
      const difference = getFoodDifference({
        shoppingFood: shoppingFood,
        cupboardFood: cupboardFood,
      });
      console.log({ food: shoppingFood, cupboardFood, difference });
      if (difference.scaleAmount > 0) {
        list[shoppingFood.category!][food_meal_id] = difference;
      }
    } else {
      list[shoppingFood.category!][food_meal_id] = shoppingFood;
    }
  });

  return list;
};

export default buildShoppingList;
