import {
  FoodCategoriesEnum,
  FoodGroup,
  FoodKind,
  mergeScales,
} from "@/features/foods";
import { getNewAmount } from "@/utils";
import { ShoppingListT } from "@/features/shopping";

const mergeFoodsWithSameScaleName = ({ foods }: { foods: FoodGroup }) => {
  const mergedFoods: FoodGroup = {};

  Object.values(foods).forEach((food) => {
    const { food_id, scale_name, scale_amount } = food;
    if (!food_id) return;

    if (!mergedFoods[food_id]) {
      mergedFoods[food_id] = food;
    } else {
      const scaleName = mergedFoods[food_id].scale_name;
      const scalesMerged = mergeScales(food);
      const amountUpdated = getNewAmount({
        scales: scalesMerged,
        prev_scale_name: scale_name,
        new_scale_name: scaleName,
        scale_amount: scale_amount,
      });
      mergedFoods[food_id].scale_amount += amountUpdated || 0;
    }
  });
  return mergedFoods;
};

const buildShoppingList = ({ foods }: { foods: FoodGroup }): ShoppingListT => {
  const foodCategories = Object.keys(FoodCategoriesEnum);
  const list: ShoppingListT = {};

  foodCategories.forEach((category: string) => {
    list[category] = { foods: {} };
  });

  Object.keys(foods).forEach((food_meal_id) => {
    const food = foods[food_meal_id];
    const { kind } = food;

    if (kind === FoodKind.recipe) {
      const { ingredients } = food;
      Object.keys(ingredients).forEach((ingredient_id) => {
        const ingredient = ingredients[ingredient_id];
        list[ingredient.food_category!].foods[food_meal_id + ingredient_id] = {
          ...ingredient,
        };
      });
    } else if (kind === FoodKind.basic_food) {
      list[food.food_category!].foods[food_meal_id] = { ...food };
    }
  });

  const listMerged: ShoppingListT = list;

  Object.keys(list).forEach((category) => {
    const { foods } = list[category];
    if (!foods || Object.values(foods).length < 1) return;
    // Merge
    listMerged[category].foods = mergeFoodsWithSameScaleName({ foods });
  });

  return listMerged;
};

export default buildShoppingList;
