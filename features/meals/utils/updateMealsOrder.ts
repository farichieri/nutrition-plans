import { UserMeals, UserMealsArr } from "@/features/meals";

const updateMealsOrder = ({ meals }: { meals: UserMealsArr }): UserMeals => {
  const mealsUpdated: UserMeals = {};
  meals.forEach((meal, index) => {
    if (!meal.id) return;
    mealsUpdated[meal.id] = {
      ...meal,
      order: index,
    };
  });
  return mealsUpdated;
};

export default updateMealsOrder;
