import { FoodCategoriesEnum, FoodGroup } from "@/features/foods";
import { ShoppingListT } from "@/features/shopping";

const mergeFoodsByScale = ({ foods }: { foods: FoodGroup }) => {
  const mergedFoods: FoodGroup = {};
  Object.keys(foods).forEach((food_meal_id) => {
    const food = foods[food_meal_id];
    const scale_name = food.scale_name;
  });
  return mergedFoods;
};

const buildShoppingList = ({ foods }: { foods: FoodGroup }): ShoppingListT => {
  const foodCategories = Object.keys(FoodCategoriesEnum);
  const list: ShoppingListT = [];

  foodCategories.forEach((category: string) => {
    list.push({ category, foods: {} });
  });

  Object.keys(foods).forEach((food_meal_id) => {
    const food = foods[food_meal_id];
    const category = food.food_category;
    list.forEach((item) => {
      if (item.category === category) {
        item.foods[food_meal_id] = food;
      }
    });
  });
  return list;
};

export default buildShoppingList;
