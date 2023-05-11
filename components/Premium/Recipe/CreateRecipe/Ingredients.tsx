import {
  selectCreateRecipeSlice,
  setRecipeState,
} from "@/store/slices/createRecipeSlice";
import { FC } from "react";
import { Food, FoodGroup, Ingredient } from "@/types/foodTypes";
import { getNewAmount } from "../../Food/useNutrition";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import Select from "@/components/Form/Select";
import Spinner from "@/components/Loader/Spinner";

const Ingredient = ({
  ingredient,
  foodIngredient,
}: {
  ingredient: Ingredient;
  foodIngredient: Food;
}) => {
  const dispatch = useDispatch();
  const { recipeState } = useSelector(selectCreateRecipeSlice);

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const id = (event.target as HTMLButtonElement).id;
    const ingredients = [...recipeState.ingredients];
    const ingredientExists = ingredients.find((ing) => ing.food_id === id);

    if (ingredientExists) {
      ingredients.splice(ingredients.indexOf(ingredientExists), 1);
      dispatch(
        setRecipeState({
          ...recipeState,
          ingredients: ingredients,
        })
      );
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const type = event.target.type;
    const name = event.target.name;
    const id = event.target.id;
    const value = event.target.value;
    const valueF = type === "number" ? Number(value) : value;

    const ingredients = [...recipeState.ingredients];
    const ingredientExists = ingredients.find((ing) => ing.food_id === id);
    let ingredientUpdated: Ingredient = { ...ingredient };

    if (name === "weight_name") {
      const newAmount = getNewAmount(
        foodIngredient,
        ingredient.weight_name,
        value,
        ingredient.amount
      );
      ingredientUpdated = {
        ...ingredient,
        weight_name: value,
        amount: newAmount || ingredient.amount,
      };
    } else {
      ingredientUpdated = {
        ...ingredient,
        [name]: valueF,
      };
    }

    if (ingredientExists) {
      ingredients[ingredients.indexOf(ingredientExists)] = ingredientUpdated;
      dispatch(
        setRecipeState({
          ...recipeState,
          ingredients: ingredients,
        })
      );
    }
  };

  if (!foodIngredient) {
    return (
      <div className="m-auto">
        <Spinner customClass="h-5 w-5" />
      </div>
    );
  }

  return (
    <div className="flex items-center rounded-md border">
      <Image
        src={foodIngredient.image}
        height={125}
        width={125}
        alt={foodIngredient.food_name || ""}
        className="rounded-md"
      />
      <div className="flex w-full px-2">
        <div className="w-full">
          <div className="flex flex-col">
            <span className="text-base font-semibold capitalize">
              {foodIngredient.food_name}
            </span>
            <span className="text-sm opacity-50">
              {foodIngredient.food_description}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex w-full items-center gap-2">
              <NutritionInput
                handleChange={handleChange}
                id={ingredient.food_id}
                isRequired={false}
                key={"amount"}
                labelFor={"amount"}
                labelText={""}
                min={"0"}
                name={"amount"}
                step={"1"}
                title={""}
                type={"number"}
                value={ingredient.amount}
              />
              <Select
                customClass={"h-full"}
                handleChange={handleChange}
                id={ingredient.food_id}
                isRequired={false}
                labelFor={"Amount"}
                labelText={""}
                name={"weight_name"}
                title={"Scale Type"}
                options={[foodIngredient.serving_name || "", "grams", "oz"]}
                value={ingredient.weight_name}
              />
            </div>
            <Input
              handleChange={handleChange}
              id={ingredient.food_id}
              isRequired={false}
              labelFor={"text"}
              labelText={""}
              name={"text"}
              title={"Food Name"}
              type={"text"}
              value={ingredient.text}
              placeholder="Aditional Note"
            />
          </div>
        </div>
        <button
          onClick={handleRemove}
          id={ingredient.food_id}
          className="ml-auto"
        >
          <span className="material-icons pointer-events-none w-6">
            delete_outlined
          </span>
        </button>
      </div>
    </div>
  );
};

interface Props {
  foodIngredients: FoodGroup;
  ingredients: Ingredient[];
}

const Ingredients: FC<Props> = ({ foodIngredients, ingredients }) => {
  if (Object.keys(foodIngredients).length < 1) {
    return <Spinner customClass="h-5 w-5" />;
  }

  return (
    <div className="flex flex-col gap-1">
      {ingredients.map((ing) => (
        <Ingredient
          foodIngredient={foodIngredients[ing.food_id]}
          ingredient={ing}
          key={ing.food_id}
        />
      ))}
    </div>
  );
};

export default Ingredients;
