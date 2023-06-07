import { Diet, DietMeal } from "../../types";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FC } from "react";
import { Food, RecipeCreateIngredients } from "@/features/foods";
import { selectPlansSlice, setDietOpened } from "../../slice";
import { useDispatch, useSelector } from "react-redux";
import AddFood from "./AddFood";
import FoodInMealCard from "./FoodCard";

interface Props {
  dietMeal: DietMeal;
  mealKcals: number;
  dietOpened: Diet;
}

const MealCard: FC<Props> = ({ dietMeal, mealKcals, dietOpened }) => {
  const dispatch = useDispatch();
  const { isEditingDiet } = useSelector(selectPlansSlice);

  const handleRemove = (event: React.MouseEvent) => {
    event.preventDefault();
    const id = (event.target as HTMLButtonElement).id;
    if (!dietMeal.diet_meal_id || !dietOpened) return;

    const dietMeals = { ...dietOpened?.diet_meals };
    const dietMealOpened = { ...dietMeals[dietMeal.diet_meal_id] };
    const dietMealFoods = { ...dietMealOpened.diet_meal_foods };
    delete dietMealFoods[id];

    const dietUpdated: Diet = {
      ...dietOpened,
      diet_meals: {
        ...dietMeals,
        [dietMeal.diet_meal_id]: {
          ...dietMealOpened,
          diet_meal_foods: {
            ...dietMealFoods,
          },
        },
      },
    };
    dispatch(setDietOpened(dietUpdated));
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    // const ingsReordered = reorderArr(
    //   ingsState,
    //   source.index,
    //   destination.index
    // );
    // updateIngredientsOrder(ingsReordered);
    // setIngsState(ingsReordered);
  };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   const scalesMerged = mergeScales(food);
  //   const type = event.target.type;
  //   const name = event.target.name;
  //   const id = event.target.id;
  //   const value = event.target.value;
  //   const valueF = type === "number" ? Number(value) : value;

  //   const ingredients = { ...recipeState.ingredients };
  //   let ingredient = { ...ingredients[id] };
  //   let ingredientUpdated = { ...ingredient };

  //   if (name === "scale_name") {
  //     // Este tiene que pasar a (food, scale_amount)
  //     const newAmount = getNewAmount(
  //       scalesMerged,
  //       food.scale_name || "grams",
  //       value,
  //       food.scale_amount || 1
  //     );
  //     ingredientUpdated = {
  //       ...food,
  //       scale_name: value,
  //       scale_amount: newAmount || food.serving_amount,
  //     };
  //   } else {
  //     ingredientUpdated = {
  //       ...food,
  //       [name]: valueF,
  //     };
  //   }
  //   ingredients[id] = ingredientUpdated;
  //   // dispatch(
  //   //   setRecipeState({
  //   //     ...recipeState,
  //   //     ingredients: ingredients,
  //   //   })
  //   // );
  // };

  return (
    <div
      key={dietMeal.diet_meal_id}
      className="min-h-20 flex w-full flex-col overflow-auto rounded-md border "
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
        {!isEditingDiet && (
          <div className="flex items-center">
            {/* Eaten */}
            <span className="material-icons">radio_button_unchecked</span>
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
              {Object.keys(dietMeal.diet_meal_foods).map((food_id, index) => {
                const food: Food = dietMeal.diet_meal_foods[food_id];
                return (
                  <Draggable
                    key={food_id}
                    draggableId={food_id}
                    index={index}
                    isDragDisabled={!isEditingDiet}
                  >
                    {(draggableProvided) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        className="flex items-center gap-2 px-0 hover:bg-slate-500/20 active:bg-slate-500/40"
                      >
                        {isEditingDiet && (
                          <span className="material-icons-outlined opacity-50">
                            drag_handle
                          </span>
                        )}
                        <FoodInMealCard
                          food={food}
                          handleRemove={handleRemove}
                        />
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
      {isEditingDiet && <AddFood dietMeal={dietMeal} />}
    </div>
  );
};

export default MealCard;

// ;
