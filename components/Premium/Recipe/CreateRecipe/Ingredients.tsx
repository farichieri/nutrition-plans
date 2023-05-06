import NutritionInput from "@/components/Form/NutritionInput";
import Select from "@/components/Form/Select";
import { fetchFoodByID } from "@/firebase/helpers/Food";
import {
  selectCreateRecipeSlice,
  setRecipeState,
} from "@/store/slices/createRecipeSlice";
import { Food, Ingredient } from "@/types/foodTypes";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Ingredient = ({ ing }: { ing: Ingredient }) => {
  const dispatch = useDispatch();
  const { recipeState } = useSelector(selectCreateRecipeSlice);
  const [ingredient, setIngredient] = useState<Food | null>(null);
  const options = [ing.weight_name || "", "grams", "oz"];

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const id = (event.target as HTMLButtonElement).id;
    const newIngredients = [...recipeState.ingredients];
    const ingredientExists = newIngredients.find((ing) => ing.food_id === id);

    if (ingredientExists) {
      newIngredients.splice(newIngredients.indexOf(ingredientExists), 1);
      dispatch(
        setRecipeState({
          ...recipeState,
          ingredients: newIngredients,
        })
      );
    }
  };

  const handleChange = () => {};

  useEffect(() => {
    const getFoodData = async (id: string) => {
      const foodFetched: Food = await fetchFoodByID(id);
      setIngredient(foodFetched);
    };
    getFoodData(ing.food_id);
  }, []);

  if (!ingredient) {
    return <></>;
  }

  return (
    <div key={ing.food_id} className="flex items-center rounded-md border">
      <Image
        src={ingredient.image}
        height={150}
        width={150}
        alt={ingredient.food_name || ""}
        className="rounded-md"
      />
      <div className="flex w-full p-2">
        <div className="w-full">
          <div className="flex flex-col">
            <span className="text-base font-semibold capitalize">
              {ingredient.food_name}
            </span>
            <span className="text-sm opacity-50">
              {ingredient.food_description}
            </span>
          </div>

          <div className="flex w-full items-center gap-2">
            <NutritionInput
              handleChange={handleChange}
              id={"serving_amount"}
              isRequired={false}
              key={"serving_amount"}
              labelFor={"serving_amount"}
              labelText={""}
              min={"0"}
              name={"serving_amount"}
              step={"1"}
              title={""}
              type={"number"}
              value={ing.amount}
            />
            <Select
              customClass={"h-full"}
              handleChange={handleChange}
              id={"weight_amount"}
              isRequired={false}
              labelFor={"Amount"}
              labelText={""}
              name={"amount"}
              title={"Scale Type"}
              options={options}
              value={ing.weight_name}
            />
          </div>
        </div>
        <button onClick={handleRemove} id={ing.food_id} className="ml-auto">
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
    <div className="flex flex-col gap-1">
      {ingredients.map((ing) => (
        <Ingredient ing={ing} key={ing.food_id} />
      ))}
    </div>
  );
};

export default Ingredients;
