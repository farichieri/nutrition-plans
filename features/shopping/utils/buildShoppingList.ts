import {
  FoodCategoriesEnum,
  FoodGroup,
  FoodKind,
  mergeScales,
} from "@/features/foods";
import { getNewAmount } from "@/utils";
import { ShoppingListFoods, ShoppingListT } from "@/features/shopping";

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
        list[ingredient.category!].foods[food_meal_id + ingredient_id] = {
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
      list[food.category!].foods[food_meal_id] = {
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
