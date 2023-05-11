import {
  DishTypesEnum,
  Food,
  FoodGroup,
  FoodPreferences,
  FoodType,
  RecipeCategoriesEnum,
  Ingredient,
  FoodTypesEnum,
  DigestionStatusEnum,
} from "@/types/foodTypes";
import {
  selectCreateRecipeSlice,
  setRecipeState,
} from "@/store/slices/createRecipeSlice";
import { addFood, fetchFoodIngredients } from "@/firebase/helpers/Food";
import { FC, useEffect, useState } from "react";
import { NewFood } from "@/types/initialTypes";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AddInstruction from "./AddInstruction";
import Checkbox from "@/components/Form/Checkbox";
import FormAction from "@/components/Form/FormAction";
import Image from "next/image";
import Ingredients from "./Ingredients";
import IngredientsSelector from "./IngredientsSelector";
import Input from "@/components/Form/Input";
import Instructions from "./Instructions";
import NutritionInput from "@/components/Form/NutritionInput";
import RecipeNutrition from "./RecipeNutrition";
import Select from "@/components/Form/Select";

interface Props {}
const RecipeCreate: FC<Props> = () => {
  const dispatch = useDispatch();
  const [isCreating, setIsCreating] = useState(false);
  const { recipeState } = useSelector(selectCreateRecipeSlice);
  const { user } = useSelector(selectAuthSlice);

  console.log({ recipeState });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.type;
    const name = event.target.name;
    const id = event.target.id;
    const value = event.target.value;
    const valueF = type === "number" ? Number(value) : value;
    if (name === "easily_single_serving" || name === "makes_leftovers") {
      dispatch(
        setRecipeState({
          ...recipeState,
          [id]: !recipeState[id],
        })
      );
    } else if (name === "food_type") {
      let foodTypes = { ...recipeState.food_type };
      let foodTypesUpdated = {
        ...foodTypes,
        [id]: !foodTypes[id as keyof FoodType],
      };
      dispatch(setRecipeState({ ...recipeState, food_type: foodTypesUpdated }));
    } else if (name === "food_preferences") {
      let foodTypes = { ...recipeState.food_preferences };
      let foodTypesUpdated = {
        ...foodTypes,
        [id]: !foodTypes[id as keyof FoodPreferences],
      };
      dispatch(
        setRecipeState({ ...recipeState, food_preferences: foodTypesUpdated })
      );
    } else if (name === "nutrient") {
      let nutrients = { ...recipeState.nutrients };
      let nutrientsUpdated = {
        ...nutrients,
        [id]: Number(valueF) > 0 ? Number(valueF) : 0,
      };
      dispatch(setRecipeState({ ...recipeState, nutrients: nutrientsUpdated }));
    } else {
      dispatch(setRecipeState({ ...recipeState, [id]: valueF }));
    }
  };

  const [newImageFile, setNewImageFile] = useState<File | undefined>(undefined);

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && user) {
      const file = files[0];
      if (!file) return;
      const blob = URL.createObjectURL(file);
      dispatch(setRecipeState({ ...recipeState, image: blob }));
      setNewImageFile(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    if (isCreating) return;
    setIsCreating(true);
    const res = await addFood(
      recipeState,
      FoodTypesEnum.recipe,
      newImageFile,
      user
    );
    console.log({ res });
    if (!res?.error && res?.food_id) {
      setNewImageFile(undefined);
      dispatch(setRecipeState(NewFood));
      alert("Recipe created successfully");
      // router.push(`/app/food/${res.food_id}`);
    } else {
      alert("Error creating recipe");
    }
    setIsCreating(false);
  };

  const handleCancel = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setRecipeState(NewFood));
    setNewImageFile(undefined);
  };

  const fetchFoods = async (ingredients: Ingredient[]) => {
    const ids = ingredients.map((ing) => ing.food_id);
    const result = await fetchFoodIngredients(ids);
    return result;
  };

  const [foodIngredients, setFoodIngredients] = useState<FoodGroup | null>(
    null
  );

  useEffect(() => {
    if (recipeState.ingredients.length > 0) {
      const getFoods = async () => {
        const foods = await fetchFoods(recipeState.ingredients);
        setFoodIngredients(foods);
      };
      getFoods();
    }
  }, [recipeState.ingredients.length]);

  return (
    <form
      className="mb-[100vh] mt-8 flex max-w-xl flex-col gap-2"
      onSubmit={handleSubmit}
    >
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
      <div className="flex flex-col gap-2">
        <h1 className="text-xl">Image</h1>
        <Image
          src={recipeState.image}
          width={200}
          height={200}
          alt="Food Image"
          className="rounded-lg"
        />
        <input
          title="Upload a new photo"
          type="file"
          onChange={handleUploadImage}
          accept="image/*"
        />
      </div>{" "}
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
          id={"cook_time"}
          isRequired={true}
          labelFor={"cook_time"}
          labelText={"Cook Time"}
          name={"cook_time"}
          title={"Cook Time"}
          type={"number"}
          min="0"
          unit={"minutes"}
          value={recipeState["cook_time"]}
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
        <Select
          customClass={""}
          handleChange={handleChange}
          id={"digestion_status"}
          isRequired={true}
          labelFor={"digestion_status"}
          labelText={"Digestion Status"}
          name={"digestion_status"}
          title={"Digestion Status"}
          options={Object.keys(DigestionStatusEnum)}
          value={recipeState["digestion_status" as keyof Food]}
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
          id={"makes_leftovers"}
          labelFor={"makes_leftovers"}
          labelText={"Makes good leftovers"}
          name={"makes_leftovers"}
          title={"Makes good leftovers"}
          value={recipeState["makes_leftovers" as keyof FoodType]}
        />
      </div>
      <div className="flex max-w-xl flex-col gap-2 rounded-md border p-2">
        <span className="text-3xl">Ingredients</span>
        {foodIngredients && (
          <Ingredients
            ingredients={recipeState.ingredients}
            foodIngredients={foodIngredients}
          />
        )}
        <IngredientsSelector />
      </div>
      <div className="flex max-w-xl flex-col gap-2 rounded-md border p-2">
        <div className="flex items-center gap-1">
          <span className="material-icons-outlined text-green-500">
            data_usage
          </span>
          <span className="text-2xl font-semibold">Nutrition Values</span>
        </div>
        {Object.keys(recipeState.nutrients).length > 0 && (
          <RecipeNutrition
            recipe={recipeState}
            foodIngredients={foodIngredients}
          />
        )}
      </div>
      <div className="flex max-w-xl flex-col gap-2 rounded-md border p-2">
        <span className="text-3xl">Recipe Instructions</span>
        <Instructions />
        <AddInstruction />
      </div>
      <div className="flex gap-2">
        <FormAction
          handleSubmit={handleCancel}
          text="Discard"
          action="submit"
          type="Cancel"
          isLoading={false}
        />
        <FormAction
          handleSubmit={handleSubmit}
          text="Create"
          action="submit"
          type="Submit"
          isLoading={isCreating}
        />
      </div>
    </form>
  );
};
export default RecipeCreate;
