import {
  isAllEaten,
  DietMeal,
  AddFood,
  FoodInMealCard,
} from "@/features/plans";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { FC } from "react";
import { FoodGroupArray } from "@/features/foods";
import Link from "next/link";

interface Props {
  dietMeal: DietMeal;
  mealKcals: number;
  isEditing: boolean;
}

const MealCard: FC<Props> = ({ dietMeal, mealKcals, isEditing }) => {
  const dietMealFoodsArr: FoodGroupArray = Object.values(
    dietMeal.diet_meal_foods
  ).sort((a, b) => a.order - b.order);
  const allEaten = isAllEaten(dietMealFoodsArr);

  if (!dietMeal.diet_meal_id) return <></>;

  return (
    <div
      key={dietMeal.diet_meal_id}
      className={`min-h-20 flex w-full flex-col divide-y overflow-auto rounded-md border ${
        allEaten ? "border-green-500 bg-green-500/20" : "bg-gray-500/20"
      }`}
    >
      <div className="flex items-center gap-5 px-2 py-1 text-center">
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
            {allEaten ? (
              <span className="material-icons text-green-500">
                check_circle
              </span>
            ) : (
              <span className="material-icons">radio_button_unchecked</span>
            )}
          </div>
        )}
      </div>
      <Droppable droppableId={dietMeal.diet_meal_id}>
        {(droppableProvided) => (
          <div
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
            className="w-full divide-y overflow-hidden"
          >
            {dietMealFoodsArr.length < 1 ? (
              <div className="h-1"></div>
            ) : (
              dietMealFoodsArr.map((food, index) => {
                if (!food.food_id) return <></>;
                return (
                  <Draggable
                    key={food.food_id}
                    draggableId={food.food_id + food.diet_meal_id}
                    index={index}
                    isDragDisabled={!isEditing}
                  >
                    {(draggableProvided) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        className={`flex w-full items-center gap-1 px-0 hover:bg-slate-500/20 active:bg-slate-500/50 `}
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
              })
            )}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
      {isEditing && <AddFood dietMeal={dietMeal} />}
    </div>
  );
};

export default MealCard;