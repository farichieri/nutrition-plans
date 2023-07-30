import {
  isAllEaten,
  DietMeal,
  AddFood,
  FoodInMealCard,
  getDietFoodToggled,
} from "@/features/plans";
import { CheckButton } from "@/components/Buttons";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { FC } from "react";
import { FoodGroupArray } from "@/features/foods";
import { saveDiet } from "../../services/saveDiet";
import { selectPlansSlice, toggleEatenFood } from "../../slice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

interface Props {
  dietMeal: DietMeal;
  mealKcals: number;
  isEditing: boolean;
}

const MealCard: FC<Props> = ({ dietMeal, mealKcals, isEditing }) => {
  const dispatch = useDispatch();
  const { diets } = useSelector(selectPlansSlice);
  const dietMealFoodsArr: FoodGroupArray = Object.values(dietMeal.foods).sort(
    (a, b) => a.order - b.order
  );
  const allEaten = isAllEaten(dietMealFoodsArr);

  if (!dietMeal.id || !dietMeal.dietID) return <></>;
  const diet = diets[dietMeal.dietID];

  const setAllEaten = async () => {
    if (!dietMeal.id) return;

    let dietUpdated = { ...diet };

    dietMealFoodsArr.map((food) => {
      dispatch(toggleEatenFood({ food, value: !allEaten }));
      dietUpdated = getDietFoodToggled({
        diet: dietUpdated,
        food: food,
        value: !allEaten,
      });
    });

    const res = await saveDiet({ diet: dietUpdated });
    if (res.result === "error") {
      console.log("Error saving diet");
    }
  };

  return (
    <div
      key={dietMeal.id}
      className={`min-h-20 flex w-full flex-col overflow-auto rounded-xl border ${
        allEaten
          ? "border-green-500 bg-green-500/20"
          : "bg-white dark:bg-gray-500/20"
      }`}
    >
      <div
        className={`flex items-center gap-5 px-2 py-1 text-center ${
          allEaten ? "bg-green-500/40" : "bg-black/10"
        }`}
      >
        <span className="text-xl font-semibold capitalize">
          {dietMeal.name}
        </span>
        <span className="ml-auto text-xs opacity-50">{mealKcals} calories</span>
        {!isEditing && (
          <div className="flex items-center">
            <CheckButton onClick={setAllEaten} checked={allEaten} />
          </div>
        )}
      </div>
      <Droppable droppableId={dietMeal.id}>
        {(droppableProvided) => (
          <div
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
            className={`w-full divide-y overflow-hidden ${
              allEaten ? "divide-green-500/50" : "divide-green-500/10"
            }`}
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
                          <FoodInMealCard
                            food={food}
                            isEditing={isEditing && !food.isEaten}
                          />
                        ) : (
                          <Link
                            key={food.id}
                            className="flex w-full"
                            href={`/app/food/${food.id}?amount=${food.scaleAmount}&scale=${food.scaleName}`}
                          >
                            <FoodInMealCard
                              food={food}
                              isEditing={isEditing && !food.isEaten}
                            />
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
