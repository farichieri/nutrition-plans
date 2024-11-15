import {
  Food,
  IngredientGroup,
  IngsGroupArray,
  getAllScales,
  getScaleOptions,
  selectFoodsSlice,
} from "@/features/foods";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { FoodKeys } from "@/features/foods";
import { getNewAmount } from "@/utils/nutritionHelpers";
import { MdDelete, MdDragHandle } from "react-icons/md";
import { reorderArr } from "@/utils/filter";
import { useSelector } from "react-redux";
import Image from "next/image";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import RoundButton from "@/components/Buttons/RoundButton";
import Select from "@/components/Form/FormSelect";
import Spinner from "@/components/Loader/Spinner";

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
  const scalesMerged = getAllScales({ scales: food.scales });
  const options = getScaleOptions({ scales: food.scales });

  if (!newRecipeState) return <>No State Provided</>;

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    const type = event.target.type;
    const name = event.target.name;
    const id = event.target.id;
    const value = event.target.value;
    const valueF = type === "number" ? Number(value) : value;

    const ingredients = { ...newRecipeState.ingredients };
    let ingredient = { ...ingredients[id] };
    let ingredientUpdated = { ...ingredient };

    if (name === "scaleName") {
      // Este tiene que pasar a (food, scaleAmount)
      const newAmount = getNewAmount({
        scales: scalesMerged,
        prev_scale_name: food.scaleName || "grams",
        new_scale_name: value,
        scaleAmount: food.scaleAmount || 1,
      });
      ingredientUpdated = {
        ...food,
        scaleName: value,
        scaleAmount: newAmount || food.servingAmount,
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

  if (!food.id) {
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
          src={food.imageURL}
          fill
          className="object-cover"
          alt={food.name || ""}
        />
      </span>
      <div className="flex w-full basis-4/6 px-2">
        <div className="w-full">
          <div className="flex flex-col">
            <span className="text-base font-semibold capitalize">
              {food.name}
            </span>
            <span className="text-sm opacity-50">{food.description}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex w-full items-center gap-2">
              <NutritionInput
                handleChange={handleChange}
                id={food.id}
                labelText={""}
                min={"0"}
                name={String(FoodKeys.scaleAmount)}
                step={"1"}
                title={""}
                type={"number"}
                value={food.scaleAmount}
              />
              <Select
                customClass={"h-full"}
                handleChange={handleChange}
                id={food.id}
                labelText={""}
                name={String(FoodKeys.scaleName)}
                title={"Scale Name"}
                options={options}
                value={food.scaleName}
              />
            </div>
            <Input
              handleChange={handleChange}
              id={food.id}
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
          id={food.id}
        >
          <MdDelete className="pointer-events-none h-6 w-6 opacity-50" />
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
      if (!food.id) return;
      ingredientsUpdated[food.id] = {
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
                if (ing.id)
                  return (
                    <Draggable key={ing.id} draggableId={ing.id} index={index}>
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
                            key={ing.id}
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
