import {
  addToList,
  removeFromList,
  reorderArr,
  getNutritionMerged,
} from "@/utils";
import {
  Diet,
  DietMeal,
  MealCard,
  SaveAndEditButton,
  Water,
} from "@/features/plans";
import { DragDropContext } from "@hello-pangea/dnd";
import { FC } from "react";
import { FoodGroupArray } from "@/features/foods";
import { MdRestaurant } from "react-icons/md";
import { selectAuthSlice } from "@/features/authentication";
import { updateDietMealFoodsOrder } from "@/features/plans/slice";
import { useDispatch, useSelector } from "react-redux";
import Exercise from "../common/Exercise";
import MoreDropdown from "../common/MoreDropdown";

interface Props {
  date: string;
  diet: Diet;
  isEditing: boolean;
  setIsEditing: Function;
  isMultipleDaysView: boolean;
}

const MealCards: FC<Props> = ({
  diet,
  isEditing,
  setIsEditing,
  date,
  isMultipleDaysView,
}) => {
  const dispatch = useDispatch();
  const dietMeals = diet?.meals;
  const { user } = useSelector(selectAuthSlice);

  if (!user) return <></>;

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

  const classDependingView = isMultipleDaysView
    ? "grid gap-2 sm:grid-cols-fluid_m"
    : "flex flex-col gap-2";

  return (
    <div className="w-full">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <div className="flex h-9 items-center gap-1 ">
          <MdRestaurant className="h-6 w-6 text-green-500" />
          <span className="text-2xl font-semibold">Meals</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <MoreDropdown diet={diet} />
          <SaveAndEditButton
            diet={diet}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            date={date}
            user={user}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {dietMeals && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className={classDependingView}>
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
                    />
                  );
                })}
            </div>
          </DragDropContext>
        )}
        <Water diet={diet} isEditing={isEditing} />
        <Exercise diet={diet} isEditing={isEditing} />
      </div>
    </div>
  );
};

export default MealCards;
