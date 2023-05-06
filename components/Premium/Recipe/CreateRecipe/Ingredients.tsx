import {
  selectCreateRecipeSlice,
  setRecipeState,
} from "@/store/slices/createRecipeSlice";
import { fetchFoodByID } from "@/firebase/helpers/Food";
import { FC, useEffect, useState } from "react";
import { Food, Ingredient } from "@/types/foodTypes";
import { useDispatch, useSelector } from "react-redux";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import Select from "@/components/Form/Select";
import Image from "next/image";

const Ingredient = ({ ingredient }: { ingredient: Ingredient }) => {
  const dispatch = useDispatch();
  const { recipeState } = useSelector(selectCreateRecipeSlice);
  const [foodIngredient, setFoodIngredient] = useState<Food | null>(null);

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
    const type = event.target.type;
    const name = event.target.name;
    const id = event.target.id;
    const value = event.target.value;
    const valueF = type === "number" ? Number(value) : value;

    const ingredients = [...recipeState.ingredients];
    const ingredientExists = ingredients.find((ing) => ing.food_id === id);

    const ingredientUpdated: Ingredient = {
      ...ingredient,
      [name]: valueF,
    };

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

  useEffect(() => {
    const getFoodData = async (id: string) => {
      const foodFetched: Food = await fetchFoodByID(id);
      setFoodIngredient(foodFetched);
    };
    getFoodData(ingredient.food_id);
  }, []);

  if (!foodIngredient) {
    return <></>;
  }

  return (
    <div className="flex items-center rounded-md border">
      <Image
        src={foodIngredient.image}
        height={150}
        width={150}
        alt={foodIngredient.food_name || ""}
        className="rounded-md"
      />
      <div className="flex w-full p-2">
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
              isRequired={true}
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
          <span className="material-icons pointer-events-none">cancel</span>
        </button>
      </div>
    </div>
  );
};

interface Props {}

const Ingredients: FC<Props> = () => {
  const { recipeState } = useSelector(selectCreateRecipeSlice);
  const ingredients = recipeState.ingredients;

  return (
    <div className="flex flex-col">
      {ingredients.map((ing) => (
        <Ingredient ingredient={ing} key={ing.food_id} />
      ))}
    </div>
  );
};

export default Ingredients;
