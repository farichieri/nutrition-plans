import { FoodCategoriesEnum } from "@/features/foods";
import { ShoppingListFoods, ShoppingListT } from "@/features/shopping";

const buildShoppingList = ({
  foods,
}: {
  foods: ShoppingListFoods;
}): ShoppingListT => {
  const foodCategories = Object.keys(FoodCategoriesEnum);
  const list: ShoppingListT = {};

  console.log({ foods });
  foodCategories.forEach((category: string) => {
    list[category] = {};
  });

  Object.keys(foods).forEach((food_meal_id) => {
    const food = foods[food_meal_id];

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
