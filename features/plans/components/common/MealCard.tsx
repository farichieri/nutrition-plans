import { DietMeal } from "../../types";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FC } from "react";
import { FoodGroupArray } from "@/features/foods";
import { reorderArr } from "@/utils/filter";
import { updateDietMealFoodsOrder } from "../../slice";
import { useDispatch } from "react-redux";
import AddFood from "./AddFood";
import FoodInMealCard from "./FoodInMealCard";
import Link from "next/link";

interface Props {
  dietMeal: DietMeal;
  mealKcals: number;
  isEditing: boolean;
}

const MealCard: FC<Props> = ({ dietMeal, mealKcals, isEditing }) => {
  const dispatch = useDispatch();
  const dietMealFoodsArr: FoodGroupArray = Object.values(
    dietMeal.diet_meal_foods
  );

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    const foodsReordered = reorderArr(
      dietMealFoodsArr,
      source.index,
      destination.index
    );
    updateFoodsOrder(foodsReordered);
  };

  const updateFoodsOrder = (foodsArrayOrdered: FoodGroupArray) => {
    dispatch(updateDietMealFoodsOrder({ dietMeal, foodsArrayOrdered }));
  };

  const isAllEaten = (dietMealFoodsArr: FoodGroupArray) => {
    let result = true;

    if (dietMealFoodsArr.length < 1) result = false;

    dietMealFoodsArr.forEach((food) => {
      if (food.eaten === false) result = false;
    });

    return result;
  };

  return (
    <div
      key={dietMeal.diet_meal_id}
      className="min-h-20 flex w-full flex-col overflow-auto rounded-md border bg-gray-500/20"
    >
      <div className="flex items-center gap-5 border-b px-2 py-1 text-center">
        <span className="font-semibold capitalize">
          {dietMeal.diet_meal_name}
        </span>
        {/* <div className="flex w-full flex-col text-left text-xs">
          <span className="text-blue-500">
            Meal Complexity: {dietMeal.complexity}
          </span>
          <span className="text-cyan-500">Meal Cook: {String(dietMeal.cook)}</span>
          <span className="text-yellow-500">Meal Time: {dietMeal.time}</span>
          <span className="text-purple-500">Meal Size: {dietMeal.size}</span>
        </div> */}
        <span className="ml-auto text-xs opacity-50">{mealKcals} calories</span>
        {!isEditing && (
          <div className="flex items-center">
            {isAllEaten(dietMealFoodsArr) ? (
              <span className="material-icons text-green-500">task_alt</span>
            ) : (
              <span className="material-icons">radio_button_unchecked</span>
            )}
          </div>
        )}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="ingredients">
          {(droppableProvided) => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="divide-y"
            >
              {dietMealFoodsArr.map((food, index) => {
                if (!food.food_id) return <></>;
                return (
                  <Draggable
                    key={food.food_id}
                    draggableId={food.food_id}
                    index={index}
                    isDragDisabled={!isEditing}
                  >
                    {(draggableProvided) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        className="flex items-center gap-1 px-0 hover:bg-slate-500/20 active:bg-slate-500/40"
                      >
                        {isEditing ? (
                          <FoodInMealCard food={food} isEditing={isEditing} />
                        ) : (
                          <Link
                            key={food.food_id}
                            className="flex w-full"
                            href={`/app/food/${food.food_id}?amount=${food.scale_amount}&scale=${food.scale_name}`}
                          >
                            <FoodInMealCard food={food} isEditing={isEditing} />
                          </Link>
                        )}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {isEditing && <AddFood dietMeal={dietMeal} />}
    </div>
  );
};

export default MealCard;

// ;
