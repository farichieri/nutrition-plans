import {
  selectCreateFoodSlice,
  setRecipeState,
} from "@/store/slices/createFoodSlice";
import { FC } from "react";
import { getNewAmount } from "../Food/nutritionHelpers";
import { Ingredient, IngredientGroup } from "@/types/foodTypes";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import Select from "@/components/Form/Select";
import Spinner from "@/components/Loader/Spinner";

interface IngredientProps {
  ingredient: Ingredient;
}

const Ingredient: FC<IngredientProps> = (props) => {
  const food = props.ingredient.food;
  console.log({ food });
  const dispatch = useDispatch();
  const { recipeState } = useSelector(selectCreateFoodSlice);

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

    console.log(food);
    console.log(valueF);

    if (name === "scale_name") {
      // Este tiene que pasar a (food, scale_amount)
      const newAmount = getNewAmount(
        food,
        food.scale_name || "grams",
        value,
        food.scale_amount || 1
      );
      ingredientUpdated = {
        ...ingredientUpdated,
        food: {
          ...ingredient.food,
          scale_name: value,
          scale_amount: newAmount || ingredient.food.serving_amount,
        },
      };
    } else {
      ingredientUpdated = {
        ...ingredientUpdated,
        food: {
          ...ingredient.food,
          [name]: valueF,
        },
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
    <div className="flex items-center rounded-md border">
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
              labelFor={"text"}
              labelText={""}
              name={"text"}
              title={"Food Name"}
              type={"text"}
              value={food.text}
              placeholder="Aditional Note"
            />
          </div>
        </div>
        <button onClick={handleRemove} id={food.food_id} className="ml-auto">
          <span className="material-icons pointer-events-none w-6">
            delete_outlined
          </span>
        </button>
      </div>
    </div>
  );
};

interface Props {
  ingredients: IngredientGroup;
}

const Ingredients: FC<Props> = (props) => {
  if (Object.keys(props.ingredients).length < 1) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-1">
      {Object.keys(props.ingredients).map((food_id) => (
        <Ingredient ingredient={props.ingredients[food_id]} key={food_id} />
      ))}
    </div>
  );
};

export default Ingredients;
