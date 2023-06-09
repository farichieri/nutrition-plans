import { Diet, DietMeal, MealCard } from "@/features/plans";
import { FC, useState } from "react";
import { getNutritionMerged } from "@/utils/nutritionHelpers";
import { UserAccount } from "@/features/authentication";
import SaveAndEditButton from "../common/SaveAndEditButton";

interface Props {
  diet: Diet;
  date: string;
  user: UserAccount;
}

const ManualMeals: FC<Props> = ({ diet, date, user }) => {
  const dietMeals = diet?.diet_meals;
  const [isEditing, setIsEditing] = useState(false);

  // Update Meal.

  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <span className="material-icons-outlined text-green-500">
          restaurant
        </span>
        <span className="text-2xl font-semibold">Meals</span>
        <SaveAndEditButton
          diet={diet}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          date={date}
          user={user}
        />
      </div>
      {dietMeals && (
        <div className="flex flex-col gap-2">
          {Object.values(dietMeals)
            .sort((a: any, b: any) => Number(a.order) - Number(b.order))
            .map((dietMeal: DietMeal) => {
              const nutritionMerged = getNutritionMerged(
                dietMeal.diet_meal_foods
              );
              const { calories } = nutritionMerged;
              return (
                <MealCard
                  isEditing={isEditing}
                  dietMeal={dietMeal}
                  mealKcals={Number(calories)}
                  key={dietMeal.diet_meal_id}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ManualMeals;
