import {
  Food,
  IngredientGroup,
  IngsGroupArray,
  getScaleOptions,
  mergeScales,
  selectFoodsSlice,
} from "@/features/foods";
import { useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { FoodKeys } from "@/types/initialTypes";
import { getNewAmount } from "@/utils/nutritionHelpers";
import { reorderArr } from "@/utils/filter";
import Image from "next/image";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import RoundButton from "@/components/Buttons/RoundButton";
import Select from "@/components/Form/FormSelect";
import Spinner from "@/components/Loader/Spinner";
import { MdDelete, MdDragHandle } from "react-icons/md";

interface IngredientProps {
  ingredient: Food;
  handleRemove: MouseEventHandler;
  handleUpdateIngredients: Function;
}

const Ingredient: FC<IngredientProps> = ({
  ingredient,
  handleRemove,
  handleUpdateIngredients,
}) => {
  const food = ingredient;
  const { newRecipeState } = useSelector(selectFoodsSlice);
  const scalesMerged = mergeScales(food);
  const options = getScaleOptions(scalesMerged);

  if (!newRecipeState) return <>No State Provided</>;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const type = event.target.type;
    const name = event.target.name;
    const id = event.target.id;
    const value = event.target.value;
    const valueF = type === "number" ? Number(value) : value;

    const ingredients = { ...newRecipeState.ingredients };
    let ingredient = { ...ingredients[id] };
    let ingredientUpdated = { ...ingredient };

    if (name === "scale_name") {
      // Este tiene que pasar a (food, scale_amount)
      const newAmount = getNewAmount(
        scalesMerged,
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
    handleUpdateIngredients(ingredients);
  };

  if (!food.food_id) {
    return (
      <div className="m-auto">
        <Spinner customClass="h-5 w-5" />
      </div>
    );
  }

  return (
    <div className="flex w-full items-center overflow-auto rounded-md border">
      <span className="relative h-36 w-full basis-2/6">
        <Image
          src={food.image}
          fill
          className="object-cover"
          alt={food.food_name || ""}
        />
      </span>
      <div className="flex w-full basis-4/6 px-2">
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
                labelText={""}
                min={"0"}
                name={String(FoodKeys.scale_amount)}
                step={"1"}
                title={""}
                type={"number"}
                value={food.scale_amount}
              />
              <Select
                customClass={"h-full"}
                handleChange={handleChange}
                id={food.food_id}
                labelText={""}
                name={String(FoodKeys.scale_name)}
                title={"Scale Name"}
                options={options}
                value={food.scale_name}
              />
            </div>
            <Input
              handleChange={handleChange}
              id={food.food_id}
              isRequired={false}
              labelFor={FoodKeys.note}
              labelText={""}
              name={FoodKeys.note}
              title={"Food Note"}
              type={FoodKeys.note}
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
          <MdDelete className="h-6 w-6 opacity-50" />
        </RoundButton>
      </div>
    </div>
  );
};

interface Props {
  ingredients: IngredientGroup;
  handleUpdateIngredients: Function;
}

const RecipeIngredients: FC<Props> = ({
  ingredients,
  handleUpdateIngredients,
}) => {
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
    handleUpdateIngredients(ingredientsUpdated);
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const id = (event.target as HTMLButtonElement).id;
    const newIngredients = { ...ingredients };
    delete newIngredients[id];
    handleUpdateIngredients(newIngredients);
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
                          <MdDragHandle className="h-6 w-6 opacity-50" />
                          <Ingredient
                            ingredient={ing}
                            key={ing.food_id}
                            handleRemove={handleRemove}
                            handleUpdateIngredients={handleUpdateIngredients}
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
    </div>
  );
};

export default RecipeIngredients;
