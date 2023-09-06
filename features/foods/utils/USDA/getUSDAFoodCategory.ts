import { FoodCategories, FoodCategoriesValues } from "@/features/foods/types";

type USDAFoodCategory = {
  description: string;
  id: number;
};

const getUSDAFoodCategory = ({
  foodCategory,
}: {
  foodCategory: USDAFoodCategory;
}): FoodCategoriesValues | null => {
  if (!foodCategory) return null;
  const { id } = foodCategory;
  switch (id) {
    case 1:
      return FoodCategories.dairy_and_eggs_products;
    case 2:
      return FoodCategories.spices_and_herbs;
    case 4:
      return FoodCategories.fats_and_oils;
    case 5:
      return FoodCategories.poultry_products;
    case 6:
      return FoodCategories.soups_sauces_and_gravies;
    case 7:
      return FoodCategories.sausages_and_luncheon_meats;
    case 8:
      return FoodCategories.breakfast_cereals;
    case 9:
      return FoodCategories.fruits_and_fruit_juices;
    case 10:
      return FoodCategories.pork_products;
    case 11:
      return FoodCategories.vegetables_and_vegetable_products;
    case 12:
      return FoodCategories.nut_and_seed_products;
    case 13:
      return FoodCategories.beef_products;
    case 14:
      return FoodCategories.beverages;
    case 15:
      return FoodCategories.finfish_and_shellfish_products;
    case 16:
      return FoodCategories.legumes_and_legume_products;
    case 17:
      return FoodCategories.lamb_veal_and_game_products;
    case 18:
      return FoodCategories.baked_products;
    case 19:
      return FoodCategories.sweets;
    case 20:
      return FoodCategories.cereal_grains_and_pasta;
    case 21:
      return FoodCategories.fast_foods;
    case 22:
      return FoodCategories.meals_entrees_and_side_dishes;
    case 23:
      return FoodCategories.snacks;
    case 25:
      return FoodCategories.restaurant_foods;
    case 26:
      return FoodCategories.branded_food_products_database;
    case 28:
      return FoodCategories.alcoholic_beverages;
    default:
      return null;
  }
};

export { getUSDAFoodCategory };
