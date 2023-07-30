import {
  isAllEaten,
  DietMeal,
  AddFood,
  FoodInMealCard,
} from "@/features/plans";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { FC } from "react";
import { FoodGroupArray } from "@/features/foods";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import Link from "next/link";

interface Props {
  dietMeal: DietMeal;
  mealKcals: number;
  isEditing: boolean;
}

const MealCard: FC<Props> = ({ dietMeal, mealKcals, isEditing }) => {
  const dietMealFoodsArr: FoodGroupArray = Object.values(dietMeal.foods).sort(
    (a, b) => a.order - b.order
  );
  const allEaten = isAllEaten(dietMealFoodsArr);

  if (!dietMeal.id) return <></>;

  return (
    <div
      key={dietMeal.id}
      className={`min-h-20 flex w-full flex-col divide-y overflow-auto rounded-xl border ${
        allEaten
          ? "border-green-500 bg-green-500/20"
          : "bg-white dark:bg-gray-500/20"
      }`}
    >
      <div className="flex items-center gap-5 px-2 py-1 text-center">
        <span className="text-xl font-semibold capitalize">
          {dietMeal.name}
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
              <MdCheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <MdRadioButtonUnchecked className="h-6 w-6 text-gray-500" />
            )}
          </div>
        )}
      </div>
      <Droppable droppableId={dietMeal.id}>
        {(droppableProvided) => (
          <div
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
            className="w-full divide-y overflow-hidden"
          >
            {dietMealFoodsArr.length < 1 && !isEditing ? (
              <span className="m-2 flex h-10 text-sm opacity-50">
                No foods added yet.
              </span>
            ) : (
              dietMealFoodsArr.map((food, index) => {
                if (!food.id) return <></>;
                return (
                  <Draggable
                    key={food.id}
                    draggableId={food.id + food.dietMealID}
                    index={index}
                    isDragDisabled={!isEditing}
                  >
                    {(draggableProvided) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        className={`flex w-full items-center gap-1 px-0 hover:bg-slate-500/20  active:bg-slate-500/50 `}
                      >
                        {isEditing ? (
                          <FoodInMealCard food={food} isEditing={isEditing} />
                        ) : (
                          <Link
                            key={food.id}
                            className="flex w-full"
                            href={`/app/food/${food.id}?amount=${food.scaleAmount}&scale=${food.scaleName}`}
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
