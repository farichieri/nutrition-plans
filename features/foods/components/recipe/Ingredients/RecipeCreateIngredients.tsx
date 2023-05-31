import {
  selectCreateFoodSlice,
  setRecipeState,
} from "@/store/slices/createFoodSlice";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FC, useEffect, useState } from "react";
import { Food, IngredientGroup, IngsGroupArray } from "@/features/foods/types";
import { getNewAmount } from "../../../../../utils/nutritionHelpers";
import { reorderArr } from "@/utils/filter";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import RoundButton from "@/components/Buttons/RoundButton";
import Select from "@/components/Form/Select";
import Spinner from "@/components/Loader/Spinner";

interface IngredientProps {
  ingredient: Food;
}

const Ingredient: FC<IngredientProps> = ({ ingredient }) => {
  const food = ingredient;
  const dispatch = useDispatch();
  const { recipeState } = useSelector(selectCreateFoodSlice);

  if (!recipeState) return <>No State Provided</>;

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const id = (event.target as HTMLButtonElement).id;
    const ingredients = { ...recipeState.ingredients };
    delete ingredients[id];
    dispatch(
      setRecipeState({
        ...recipeState,
        ingredients: ingredients,
      })
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const type = event.target.type;
    const name = event.target.name;
    const id = event.target.id;
    const value = event.target.value;
    const valueF = type === "number" ? Number(value) : value;

    const ingredients = { ...recipeState.ingredients };
    let ingredient = { ...ingredients[id] };
    let ingredientUpdated = { ...ingredient };

    if (name === "scale_name") {
      // Este tiene que pasar a (food, scale_amount)
      const newAmount = getNewAmount(
        food,
        food.scale_name || "grams",
        value,
        food.scale_amount || 1
      );
      ingredientUpdated = {
        ...food,
        scale_name: value,
        scale_amount: newAmount || food.serving_amount,
      };
    } else {
      ingredientUpdated = {
        ...food,
        [name]: valueF,
      };
    }
    ingredients[id] = ingredientUpdated;
    dispatch(
      setRecipeState({
        ...recipeState,
        ingredients: ingredients,
      })
    );
  };

  if (!food.food_id) {
    return (
      <div className="m-auto">
        <Spinner customClass="h-5 w-5" />
      </div>
    );
  }

  return (
    <div className="flex w-full items-center rounded-md border">
      <Image
        src={food.image}
        height={150}
        width={150}
        alt={food.food_name || ""}
        className="h-[100px] w-[100px] min-w-[100px] max-w-[100px] rounded-md object-cover"
      />
      <div className="flex w-full px-2">
        <div className="w-full">
          <div className="flex flex-col">
            <span className="text-base font-semibold capitalize">
              {food.food_name}
            </span>
            <span className="text-sm opacity-50">{food.food_description}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex w-full items-center gap-2">
              <NutritionInput
                handleChange={handleChange}
                id={food.food_id}
                isRequired={false}
                key={"scale_amount"}
                labelFor={"scale_amount"}
                labelText={""}
                min={"0"}
                name={"scale_amount"}
                step={"1"}
                title={""}
                type={"number"}
                value={food.scale_amount}
              />
              <Select
                customClass={"h-full"}
                handleChange={handleChange}
                id={food.food_id}
                isRequired={false}
                labelFor={"scale_name"}
                labelText={""}
                name={"scale_name"}
                title={"Scale Name"}
                options={[food.serving_name || "", "grams", "oz"]}
                value={food.scale_name}
              />
            </div>
            <Input
              handleChange={handleChange}
              id={food.food_id}
              isRequired={false}
              labelFor={"note"}
              labelText={""}
              name={"note"}
              title={"Food Note"}
              type={"note"}
              value={food.note}
              placeholder="Aditional Note"
            />
          </div>
        </div>
        <RoundButton
          customClass="w-10 h-10 p-1.5 my-auto ml-auto"
          onClick={handleRemove}
          id={food.food_id}
        >
          <span className="material-icons pointer-events-none">delete</span>
        </RoundButton>
      </div>
    </div>
  );
};

interface Props {
  ingredients: IngredientGroup;
}

const RecipeCreateIngredients: FC<Props> = ({ ingredients }) => {
  const dispatch = useDispatch();
  const { recipeState } = useSelector(selectCreateFoodSlice);

  const ingArrSorted = Object.values(ingredients).sort(
    (a, b) => a.order - b.order
  );
  const [ingsState, setIngsState] = useState<IngsGroupArray>(ingArrSorted);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    const ingsReordered = reorderArr(
      ingsState,
      source.index,
      destination.index
    );
    updateIngredientsOrder(ingsReordered);
    setIngsState(ingsReordered);
  };

  const updateIngredientsOrder = async (ingsReordered: IngsGroupArray) => {
    const ingredientsUpdated: IngredientGroup = { ...ingredients };
    ingsReordered.forEach((food, index) => {
      if (!food.food_id) return;
      ingredientsUpdated[food.food_id] = {
        ...food,
        order: index,
      };
    });
    dispatch(
      setRecipeState({
        ...recipeState,
        ingredients: ingredientsUpdated,
      })
    );
  };

  useEffect(() => {
    const ingArrSorted = Object.values(ingredients).sort(
      (a, b) => a.order - b.order
    );
    setIngsState(ingArrSorted);
  }, [ingredients]);

  if (ingsState.length < 1) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-1">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="ingredients">
          {(droppableProvided) => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="divide-y"
            >
              {ingsState.map((ing, index) => {
                if (ing.food_id)
                  return (
                    <Draggable
                      key={ing.food_id}
                      draggableId={ing.food_id}
                      index={index}
                    >
                      {(draggableProvided) => (
                        <div
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          className="flex items-center gap-2 px-0 py-2 hover:bg-slate-500/20 active:bg-slate-500/40"
                        >
                          <span className="material-icons-outlined opacity-50">
                            drag_handle
                          </span>
                          <Ingredient ingredient={ing} key={ing.food_id} />
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
    </div>
  );
};

export default RecipeCreateIngredients;
