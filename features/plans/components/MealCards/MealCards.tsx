import {
  Diet,
  DietMeal,
  MealCard,
  updateDietMealFoodsOrder,
  SaveAndEditButton,
} from "@/features/plans";
import {
  addToList,
  removeFromList,
  reorderArr,
  getNutritionMerged,
} from "@/utils";
import { DragDropContext } from "@hello-pangea/dnd";
import { FC, useState } from "react";
import { FoodGroupArray } from "@/features/foods";
import { useDispatch } from "react-redux";
import { UserAccount } from "@/features/authentication";

interface Props {
  diet: Diet;
  date: string;
  user: UserAccount;
}

const MealCards: FC<Props> = ({ diet, date, user }) => {
  const dispatch = useDispatch();
  const dietMeals = diet?.diet_meals;
  const [isEditing, setIsEditing] = useState(false);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      // Different dietMeal.
      const sourceDietMeal = dietMeals[source.droppableId];
      const destinationDietMeal = dietMeals[destination.droppableId];

      let sourceDietMealFoodsArr = Object.values(
        sourceDietMeal.diet_meal_foods
      );
      let destinationDietMealFoodsArr = Object.values(
        destinationDietMeal.diet_meal_foods
      );
      const [removedElement, newSourceList] = removeFromList(
        sourceDietMealFoodsArr,
        source.index
      );
      sourceDietMealFoodsArr = newSourceList;
      destinationDietMealFoodsArr = addToList(
        destinationDietMealFoodsArr,
        destination.index,
        removedElement
      );
      updateFoodsOrder(sourceDietMeal, sourceDietMealFoodsArr);
      updateFoodsOrder(destinationDietMeal, destinationDietMealFoodsArr);
    } else {
      // Same dietMeal
      const dietMeal = dietMeals[source.droppableId];
      const dietMealFoodsArr = Object.values(dietMeal.diet_meal_foods);
      const foodsReordered = reorderArr(
        dietMealFoodsArr,
        source.index,
        destination.index
      );
      updateFoodsOrder(dietMeal, foodsReordered);
    }
  };

  const updateFoodsOrder = (
    dietMeal: DietMeal,
    foodsArrayOrdered: FoodGroupArray
  ) => {
    dispatch(updateDietMealFoodsOrder({ dietMeal, foodsArrayOrdered }));
  };

  return (
    <div className="w-full">
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
        <DragDropContext onDragEnd={onDragEnd}>
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
        </DragDropContext>
      )}
    </div>
  );
};

export default MealCards;
