import {
  addFood,
  CompatiblePlans,
  DigestionStatusEnum,
  DishTypesEnum,
  FoodKind,
  FoodScales,
  FoodType,
  Recipe,
  RecipeCategoriesEnum,
  selectFoodsSlice,
  setRecipeState,
} from "@/features/foods";
import { FC, useState } from "react";
import { generateOptions } from "@/utils";
import { getRecipeSize } from "@/utils/nutritionHelpers";
import { NewFood } from "@/types/initialTypes";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AddInstruction from "./AddInstruction";
import Checkbox from "@/components/Form/Checkbox";
import FormAction from "@/components/Form/FormAction";
import Image from "next/image";
import IngredientsNutrition from "../Ingredients/IngredientsNutrition";
import IngredientsSelector from "../Ingredients/IngredientsSelector";
import Input from "@/components/Form/Input";
import Instructions from "./InstructionsCreate";
import NutritionInput from "@/components/Form/NutritionInput";
import RecipeCreateIngredients from "../Ingredients/RecipeCreateIngredients";
import Select from "@/components/Form/Select";
import ExtraScales from "../../common/ExtraScales";

interface Props {}
const RecipeCreate: FC<Props> = () => {
  const dispatch = useDispatch();
  const [isCreating, setIsCreating] = useState(false);
  const { recipeState } = useSelector(selectFoodsSlice);
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();

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
    } else if (name === "compatible_plans") {
      let foodTypes = { ...recipeState.compatible_plans };
      let foodTypesUpdated = {
        ...foodTypes,
        [id]: !foodTypes[id as keyof CompatiblePlans],
      };
      dispatch(
        setRecipeState({ ...recipeState, compatible_plans: foodTypesUpdated })
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

  const handleChangeScales = (newScales: FoodScales) => {
    dispatch(setRecipeState({ ...recipeState, scales: [...newScales] }));
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
    const recipeGrams = getRecipeSize(recipeState.ingredients);
    if (!recipeGrams) return;
    const newFood: Recipe = {
      ...recipeState,
      serving_grams: recipeGrams,
    };
    const res = await addFood(newFood, FoodKind.recipe, newImageFile, user);
    if (res.result === "success") {
      setNewImageFile(undefined);
      dispatch(setRecipeState(NewFood));
      alert("Recipe created successfully");
      router.push(`/app/food/${res.data.food_id}`);
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

  const handleRemoveIngredient = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
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

  return (
    <form className="flex w-full flex-col" onSubmit={handleSubmit}>
      <div className="flex w-full flex-wrap lg:divide-x">
        <div className="flex w-full max-w-xl flex-col gap-5 sm:px-4">
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
              value={recipeState["food_name" as keyof Recipe]}
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
              className="m-auto h-[300px] w-[300px] rounded-lg object-cover sm:m-0"
            />
            <input
              title="Upload a new photo"
              type="file"
              onChange={handleUploadImage}
              accept="image/*"
            />
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-3xl font-normal">Recipe Properties:</span>
            <NutritionInput
              handleChange={handleChange}
              id={"prep_time"}
              isRequired={false}
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
              isRequired={false}
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
            <div className="my-5">
              <h1 className="text-xl">Extra scales {`(optional)`}</h1>
              <div className="relative">
                <ExtraScales
                  scales={recipeState.scales}
                  handleChangeScales={handleChangeScales}
                />
              </div>
            </div>
            <Select
              customClass={""}
              handleChange={handleChange}
              id={"food_category"}
              isRequired={true}
              labelFor={"food_category"}
              labelText={"Category"}
              name={"food_category"}
              title={"Category"}
              options={generateOptions(Object.keys(RecipeCategoriesEnum))}
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
              options={generateOptions(Object.keys(DishTypesEnum))}
              value={recipeState["dish_type" as keyof Recipe]}
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
              options={generateOptions(Object.keys(DigestionStatusEnum))}
              value={recipeState["digestion_status" as keyof Recipe]}
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
            <div className="">
              <h1 className="text-xl">Compatible plans</h1>
              <div className="">
                {Object.keys(recipeState.compatible_plans).map((type) => (
                  <Checkbox
                    key={type}
                    customClass={""}
                    handleChange={handleChange}
                    id={type}
                    isRequired={false}
                    labelFor={type}
                    labelText={type}
                    name={"compatible_plans"}
                    title={type}
                    value={
                      recipeState["compatible_plans" as keyof FoodType][type]
                    }
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
        </div>
        <div className="flex w-full max-w-xl flex-col gap-5 sm:px-4">
          <div className="flex max-w-xl flex-col gap-2 rounded-md border p-2">
            <div className="flex items-center gap-1">
              <span className="material-icons-outlined text-green-500">
                data_usage
              </span>
              <span className="text-2xl font-semibold">Nutrition Values</span>
            </div>
            {Object.keys(recipeState.nutrients).length > 0 && (
              <IngredientsNutrition
                food={recipeState}
                ingredients={recipeState.ingredients}
              />
            )}
          </div>
          <div className="flex max-w-xl flex-col gap-2 rounded-md border p-2">
            <span className="text-2xl font-semibold">Ingredients</span>
            <RecipeCreateIngredients
              ingredients={recipeState.ingredients}
              handleRemove={handleRemoveIngredient}
            />
            <IngredientsSelector />
          </div>
          <div className="flex max-w-xl flex-col gap-2 rounded-md border p-2">
            <span className="text-2xl font-semibold">Instructions</span>
            <Instructions />
            <AddInstruction />
          </div>
        </div>
      </div>
      <div className="m-auto flex gap-2">
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
