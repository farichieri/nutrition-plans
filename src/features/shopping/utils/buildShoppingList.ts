import {
  ShoppingListFood,
  ShoppingListFoods,
  ShoppingListT,
} from "@/features/shopping";
import { FoodCategories } from "@/features/foods";
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
  shoppingListFoods,
  cupboardFoods,
}: {
  shoppingListFoods: ShoppingListFoods;
  cupboardFoods: ShoppingListFoods;
}): ShoppingListT => {
  const foodCategories = Object.keys(FoodCategories);
  const list: ShoppingListT = {};

  console.log({ foods: shoppingListFoods });
  foodCategories.forEach((category: string) => {
    list[category] = {};
  });

  Object.keys(shoppingListFoods).forEach((food_meal_id) => {
    const shoppingFood = shoppingListFoods[food_meal_id];
    const cupboardFood = cupboardFoods[food_meal_id];

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
