import { CheckButton } from "@/components/Buttons";
import { FoodGroupArray } from "@/features/foods";
import {
  AddFood,
  DietMeal,
  FoodInMealCard,
  getDietFoodToggled,
  isAllEaten,
  useSaveDietMutation,
} from "@/features/plans";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import Link from "next/link";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectPlansSlice, toggleEatenFood } from "../../slice";
import MealMoreDropdown from "../MealCards/meal_more_dropdown/MealMoreDropdown";

interface Props {
  dietMeal: DietMeal;
  mealKcals: number;
  isEditing: boolean;
  tourId: string;
}

const MealCard: FC<Props> = ({ tourId, dietMeal, mealKcals, isEditing }) => {
  const dispatch = useDispatch();
  const { diets } = useSelector(selectPlansSlice);
  const dietMealFoodsArr: FoodGroupArray = Object.values(dietMeal.foods).sort(
    (a, b) => a.order - b.order
  );
  const allEaten = isAllEaten(dietMealFoodsArr);
  const [saveDiet] = useSaveDietMutation();

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
    if ("error" in res) {
      toast.error("Error saving diet");
      console.log("Error saving diet");
    }
  };

  return (
    <div
      className={`min-h-20 flex w-full flex-col rounded-xl shadow-md dark:shadow-slate-500/20`}
    >
      <div
        className={`min-h-20 flex h-fit w-full flex-col rounded-xl overflow-auto border ${
          allEaten
            ? "border-green-400 bg-green-500 dark:border-green-900 dark:bg-green-900"
            : "bg-white dark:bg-gray-500/20"
        }`}
      >
        <div
          className={`flex h-11 items-center gap-2 rounded-t-xl border-b px-2 text-center ${
            allEaten
              ? "border-green-400 bg-green-500 dark:border-green-900 dark:bg-green-900"
              : "bg-black/10"
          }`}
        >
          <span className="text-xl font-semibold capitalize">
            {dietMeal.name}
          </span>
          <span className="ml-auto px-2 text-xs opacity-50">
            {mealKcals} calories
          </span>
          <div id={tourId}>
            <MealMoreDropdown diet={diet} mealID={dietMeal.id} />
          </div>
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
              className={`w-full divide-y overflow-hidden last:rounded-b-xl ${
                allEaten
                  ? "divide-green-400 dark:divide-green-900"
                  : "divide-green-500/10"
              }`}
            >
              {dietMealFoodsArr.length < 1 && !isEditing ? (
                <span className="m-2 flex h-10 text-sm opacity-50">
                  No foods planned yet.
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
                          className={` flex w-full items-center gap-1 px-0 hover:bg-slate-500/20  active:bg-slate-500/50 `}
                        >
                          {isEditing ? (
                            <FoodInMealCard
                              isEditable={true}
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
                                isEditable={true}
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
    </div>
  );
};

export default MealCard;
