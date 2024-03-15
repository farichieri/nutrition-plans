import { Food } from "@/features/foods";
import { Diet } from "..";

const getDietFoodToggled = ({
  diet,
  food,
  value,
}: {
  diet: Diet;
  food: Food;
  value: boolean;
}): Diet => {
  const { dietID, dietMealID, id } = food;
  if (!id || !dietID || !dietMealID || !diet.id) return diet;

  const dietUpdated: Diet = {
    ...diet,
    meals: {
      ...diet.meals,
      [dietMealID]: {
        ...diet.meals[dietMealID],
        foods: {
          ...diet.meals[dietMealID].foods,
          [id]: {
            ...diet.meals[dietMealID].foods[id],
            isEaten: value,
          },
        },
      },
    },
  };

  return dietUpdated;
};

export { getDietFoodToggled };
