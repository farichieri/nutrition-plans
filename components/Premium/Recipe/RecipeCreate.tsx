import Checkbox from "@/components/Form/Checkbox";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import Select from "@/components/Form/Select";
import { selectFoodsSlice } from "@/store/slices/foodsSlice";
import {
  DishTypesEnum,
  Food,
  FoodPreferences,
  FoodType,
  RecipeCategoriesEnum,
} from "@/types/foodTypes";
import { NewFood } from "@/types/initialTypes";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IngredientsSelector from "./IngredientsSelector";

interface Props {}

const RecipeCreate: FC<Props> = () => {
  const [recipeState, setRecipeState] = useState<Food>(NewFood);
  console.log({ recipeState });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.type;
    const name = event.target.name;
    const id = event.target.id;
    const value = event.target.value;
    const valueF = type === "number" ? Number(value) : value;
    if (name === "easily_single_serving" || name === "makes_leftovers") {
      setRecipeState({
        ...recipeState,
        [id]: !recipeState[id],
      });
    } else if (name === "food_type") {
      let foodTypes = { ...recipeState.food_type };
      let foodTypesUpdated = {
        ...foodTypes,
        [id]: !foodTypes[id as keyof FoodType],
      };
      setRecipeState({ ...recipeState, food_type: foodTypesUpdated });
    } else if (name === "food_preferences") {
      let foodTypes = { ...recipeState.food_preferences };
      let foodTypesUpdated = {
        ...foodTypes,
        [id]: !foodTypes[id as keyof FoodPreferences],
      };
      setRecipeState({ ...recipeState, food_preferences: foodTypesUpdated });
    } else if (name === "nutrient") {
      let nutrients = { ...recipeState.nutrients };
      let nutrientsUpdated = {
        ...nutrients,
        [id]: Number(valueF) > 0 ? Number(valueF) : 0,
      };
      setRecipeState({ ...recipeState, nutrients: nutrientsUpdated });
    } else {
      setRecipeState({ ...recipeState, [id]: valueF });
    }
  };

  return (
    <form className="mt-8 flex max-w-xl flex-col gap-2">
      <div>
        <span className="text-3xl font-semibold">Create Recipe</span>
      </div>
      <div className="flex flex-col">
        <Input
          handleChange={handleChange}
          id={"food_name"}
          isRequired={true}
          labelFor={"food_name"}
          labelText={"Name"}
          name={"food_name"}
          title={"Food Name"}
          type={"text"}
          value={recipeState["food_name" as keyof Food]}
        />
        <Input
          handleChange={handleChange}
          id={"food_description"}
          isRequired={true}
          labelFor={"food_description"}
          labelText={"Description"}
          name={"food_description"}
          title={"Food Name"}
          type={"text"}
          value={recipeState["food_description"] || ""}
        />
      </div>
      <span>Image</span>
      <div className="flex flex-col gap-5">
        <span className="text-3xl font-normal">Recipe Properties:</span>
        <NutritionInput
          handleChange={handleChange}
          id={"prep_time"}
          isRequired={true}
          labelFor={"prep_time"}
          labelText={"Prep Time"}
          name={"prep_time"}
          title={"Prep Time"}
          type={"number"}
          unit={"minutes"}
          min="0"
          value={recipeState["prep_time"]}
        />
        <NutritionInput
          handleChange={handleChange}
          id={"cook_type"}
          isRequired={true}
          labelFor={"cook_type"}
          labelText={"Cook Time"}
          name={"cook_type"}
          title={"Cook Time"}
          type={"number"}
          min="0"
          unit={"minutes"}
          value={recipeState["cook_type"]}
        />
        <NutritionInput
          handleChange={handleChange}
          id={"serving_amount"}
          isRequired={true}
          labelFor={"serving_amount"}
          labelText={"Yields"}
          name={"serving_amount"}
          title={"Yields"}
          type={"number"}
          min="0"
          unit={"servings"}
          value={recipeState["serving_amount"]}
        />
        <Select
          customClass={""}
          handleChange={handleChange}
          id={"food_category"}
          isRequired={true}
          labelFor={"food_category"}
          labelText={"Category"}
          name={"food_category"}
          title={"Category"}
          options={Object.keys(RecipeCategoriesEnum)}
          value={recipeState["food_category"]}
        />
        <Select
          customClass={""}
          handleChange={handleChange}
          id={"dish_type"}
          isRequired={true}
          labelFor={"dish_type"}
          labelText={"Dish Type"}
          name={"dish_type"}
          title={"Dish Type"}
          options={Object.keys(DishTypesEnum)}
          value={recipeState["dish_type" as keyof Food]}
        />
        <div className="">
          <h1 className="text-xl">Food Type</h1>
          <div className="">
            {Object.keys(recipeState.food_type).map((type) => (
              <Checkbox
                key={type}
                customClass={""}
                handleChange={handleChange}
                id={type}
                isRequired={false}
                labelFor={type}
                labelText={type}
                name={"food_type"}
                title={type}
                value={recipeState["food_type" as keyof FoodType][type]}
              />
            ))}
          </div>
        </div>
        <Checkbox
          customClass={""}
          handleChange={handleChange}
          isRequired={false}
          id={"easily_single_serving"}
          labelFor={"easily_single_serving"}
          labelText={"Easily Single Serving"}
          name={"easily_single_serving"}
          title={"Easily Single Serving"}
          value={recipeState["easily_single_serving" as keyof FoodType]}
        />
        <Checkbox
          customClass={""}
          handleChange={handleChange}
          isRequired={false}
          id={"easily_single_serving"}
          labelFor={"easily_single_serving"}
          labelText={"Easily Single Serving"}
          name={"easily_single_serving"}
          title={"Easily Single Serving"}
          value={recipeState["easily_single_serving" as keyof FoodType]}
        />
        <Checkbox
          customClass={""}
          handleChange={handleChange}
          isRequired={false}
          id={"makes_leftovers"}
          labelFor={"makes_leftovers"}
          labelText={"Makes good leftovers"}
          name={"makes_leftovers"}
          title={"Makes good leftovers"}
          value={recipeState["makes_leftovers" as keyof FoodType]}
        />
      </div>
      <IngredientsSelector />

      <div className="flex flex-col">
        <span>Nutrition info</span>
      </div>
      <div className="flex flex-col">
        <span>Directions:</span>
        <span>Direction 1, Direction 2...</span>
        <span>Add Direction</span>
      </div>
    </form>
  );
};
export default RecipeCreate;
