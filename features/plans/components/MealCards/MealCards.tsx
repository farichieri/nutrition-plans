import {
  Diet,
  DietMeal,
  MealCard,
  SaveAndEditButton,
  Water,
} from "@/features/plans";
import { updateDietMealFoodsOrder } from "@/features/plans/slice";
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
import { User } from "@/features/authentication";
import { MdRestaurant } from "react-icons/md";

interface Props {
  diet: Diet;
  date: string;
  user: User;
}

const MealCards: FC<Props> = ({ diet, date, user }) => {
  const dispatch = useDispatch();
  const dietMeals = diet?.meals;
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

      let sourceDietMealFoodsArr = Object.values(sourceDietMeal.foods);
      let destinationDietMealFoodsArr = Object.values(
        destinationDietMeal.foods
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
      const dietMealFoodsArr = Object.values(dietMeal.foods);
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
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <div className="flex h-9 items-center gap-1 ">
          <MdRestaurant className="h-6 w-6 text-green-500" />
          <span className="text-2xl font-semibold">Meals</span>
        </div>
        <SaveAndEditButton
          diet={diet}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          date={date}
          user={user}
        />
      </div>
      <div className="flex flex-col gap-5">
        {dietMeals && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-col gap-2">
              {Object.values(dietMeals)
                .sort((a: any, b: any) => Number(a.order) - Number(b.order))
                .map((dietMeal: DietMeal) => {
                  const nutritionMerged = getNutritionMerged(dietMeal.foods);
                  const { calories } = nutritionMerged;
                  return (
                    <MealCard
                      dietMeal={dietMeal}
                      isEditing={isEditing}
                      key={dietMeal.id}
                      mealKcals={Number(calories)}
                      setIsEditing={setIsEditing}
                    />
                  );
                })}
            </div>
          </DragDropContext>
        )}
        <Water diet={diet} isEditing={isEditing} />
      </div>
    </div>
  );
};

export default MealCards;
