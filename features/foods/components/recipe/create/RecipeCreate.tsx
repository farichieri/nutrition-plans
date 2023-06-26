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
  setNewRecipeState,
  ExtraScales,
  updateNewRecipeState,
  IngredientGroup,
  Instruction,
} from "@/features/foods";
import { FC, useEffect, useState } from "react";
import { generateOptions } from "@/utils";
import { getNutritionMerged, getRecipeSize } from "@/utils/nutritionHelpers";
import { NewFood } from "@/types/initialTypes";
import { schema } from "./utils";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "@/components/Form/Checkbox";
import FormAction from "@/components/Form/FormAction";
import FormInput from "@/components/Form/FormInput";
import FormSelect from "@/components/Form/FormSelect";
import Image from "next/image";
import RecipeNutrition from "./RecipeNutrition";
import Instructions from "./Instructions";
import NutritionInput from "@/components/Form/NutritionInput";
import Ingredients from "./Ingredients";
import TranspLoader from "@/components/Loader/TranspLoader";
import { BiSolidPieChartAlt2 } from "react-icons/bi";

interface FormValues extends Recipe {}

interface Props {}
const RecipeCreate: FC<Props> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { newRecipeState } = useSelector(selectFoodsSlice);
  const { user } = useSelector(selectAuthSlice);

  const form = useForm<FormValues>({
    defaultValues: newRecipeState,
    resolver: yupResolver(schema),
  });
  const {
    formState,
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = form;
  const { errors, isSubmitting } = formState;
  const values = getValues();
  console.log({ values });

  const handleChangeScales = (newScales: FoodScales) => {
    setValue("scales", [...newScales], { shouldDirty: true });
  };
  const handleUpdateIngredients = (ingredients: IngredientGroup) => {
    const nutritionMerged = getNutritionMerged(ingredients);
    setValue("nutrients", { ...nutritionMerged }, { shouldDirty: true });
    setValue("ingredients", { ...ingredients }, { shouldDirty: true });
  };
  const handleUpdateInstructions = (instructions: Instruction[]) => {
    setValue("instructions", [...instructions], { shouldDirty: true });
  };

  const [newImageFile, setNewImageFile] = useState<File | undefined>(undefined);

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && user) {
      const file = files[0];
      if (!file) return;
      const blob = URL.createObjectURL(file);
      setValue("image", blob);
      setNewImageFile(file);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!user || isSubmitting) return;
    const recipeGrams = getRecipeSize(data.ingredients);
    if (!recipeGrams) return;
    const newFood: Recipe = {
      ...data,
      serving_grams: recipeGrams,
    };
    const res = await addFood(newFood, FoodKind.recipe, newImageFile, user);
    if (res.result === "success") {
      setNewImageFile(undefined);
      dispatch(setNewRecipeState(NewFood));
      alert("Recipe created successfully");
      router.push(`/app/food/${res.data.food_id}`);
    } else {
      alert("Error creating recipe");
    }
  };

  const handleCancel = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setNewRecipeState(NewFood));
    reset(NewFood);
    setNewImageFile(undefined);
  };

  useEffect(() => {
    const subscription = watch((formState, { name }) => {
      if (name) {
        const objName = name.split(".")[0];
        const value = formState[objName];
        dispatch(updateNewRecipeState({ field: objName, value: value }));
      }
    });
    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  return (
    <>
      {isSubmitting && <TranspLoader text={"Creating Recipe..."} />}

      <form
        noValidate
        className="flex w-full flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-wrap lg:divide-x">
          <div className="mb-5 flex w-full max-w-xl flex-col gap-5 sm:px-4">
            <div className="flex flex-col gap-2 ">
              <FormInput
                error={errors.food_name?.message}
                id={"food_name"}
                labelText="Recipe Name"
                placeholder="Recipe Name"
                title="Recipe Name"
                type="text"
                {...register("food_name")}
              />
              <FormInput
                error={errors.food_description?.message}
                id={"food_description"}
                labelText="Recipe Description"
                placeholder="Recipe Description"
                title="Recipe Description"
                type="text"
                {...register("food_description")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl">Image</h1>
              <Image
                src={values.image}
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
              <div className="text-red-500">
                <p>{errors.image?.message}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-normal">Recipe Properties:</span>
              <NutritionInput
                changed={false}
                error={errors.prep_time?.message}
                handleChange={() => {}}
                id={"prep_time"}
                labelText="Prep Time"
                title={"Prep Time"}
                type="number"
                unit={"minutes"}
                value={values.prep_time}
                {...register("prep_time", { valueAsNumber: true, min: 0 })}
              />
              <NutritionInput
                changed={false}
                error={errors.cook_time?.message}
                handleChange={() => {}}
                id={"cook_time"}
                labelText="Cook Time"
                title={"Cook Time"}
                type="number"
                unit={"minutes"}
                value={values.cook_time}
                {...register("cook_time", { valueAsNumber: true, min: 0 })}
              />
              <NutritionInput
                changed={false}
                error={errors.serving_amount?.message}
                handleChange={() => {}}
                id={"serving_amount"}
                labelText="Yields"
                title={"Yields"}
                type="number"
                unit={"servings"}
                value={values.serving_amount}
                {...register("serving_amount", { valueAsNumber: true, min: 0 })}
              />
              <div className="my-5">
                <h1 className="text-xl">Extra scales {`(optional)`}</h1>
                <div className="relative">
                  <ExtraScales
                    scales={values.scales}
                    handleChangeScales={handleChangeScales}
                  />
                </div>
              </div>
              <FormSelect
                error={errors.food_category?.message}
                handleChange={() => {}}
                id={"food_category"}
                labelText="Recipe Category"
                options={generateOptions(Object.keys(RecipeCategoriesEnum))}
                placeholder="Recipe Category"
                title="Recipe Category"
                {...register("food_category")}
              />
              <FormSelect
                error={errors.dish_type?.message}
                handleChange={() => {}}
                id={"dish_type"}
                labelText="Dish Type"
                options={generateOptions(Object.keys(DishTypesEnum))}
                placeholder="Dish Type"
                title="Dish Type"
                {...register("dish_type")}
              />
              <div>
                <h1 className="text-xl">Food Type</h1>
                <div className="flex flex-col gap-1">
                  {Object.keys(values.food_type).map((type) => {
                    return (
                      <Checkbox
                        id={type}
                        key={type}
                        labelText={type}
                        placeholder="Food Type"
                        title="Food Type"
                        {...register(`food_type.${type as keyof FoodType}`)}
                      />
                    );
                  })}
                </div>
                <div className="text-red-500">
                  <p>{errors.food_type?.message}</p>
                </div>
              </div>
              <div>
                <h1 className="text-xl">Compatible Plans</h1>
                <div className="flex flex-col gap-1">
                  {Object.keys(values.compatible_plans).map((plan) => {
                    return (
                      <Checkbox
                        id={plan}
                        key={plan}
                        labelText={plan}
                        placeholder="Compatible Plans"
                        title="Compatible Plans"
                        {...register(
                          `compatible_plans.${plan as keyof CompatiblePlans}`
                        )}
                      />
                    );
                  })}
                </div>
                <div className="text-red-500">
                  <p>{errors.compatible_plans?.message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-xl flex-col gap-5 sm:px-4">
            <div className="flex max-w-xl flex-col gap-2 rounded-md border p-2">
              <div className="flex items-center gap-1">
                <BiSolidPieChartAlt2 className="h-6 w-6 text-green-500" />
                <span className="text-2xl font-semibold">Nutrition Values</span>
              </div>
              <RecipeNutrition nutrients={values.nutrients} />
            </div>
            <div className="flex max-w-xl flex-col gap-2 rounded-md border p-2">
              <span className="text-2xl font-semibold">Ingredients</span>
              <Ingredients
                ingredients={values.ingredients}
                handleUpdateIngredients={handleUpdateIngredients}
              />
              <div className="text-red-500">
                <p>{errors?.ingredients?.message?.toString()}</p>
              </div>
            </div>
            <div className="flex max-w-xl flex-col gap-2 rounded-md border p-2">
              <span className="text-2xl font-semibold">Instructions</span>
              <Instructions
                instructions={values.instructions}
                handleUpdateInstructions={handleUpdateInstructions}
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-xl">Optional Fields</h1>
              <FormSelect
                error={errors.digestion_status?.message}
                handleChange={() => {}}
                id={"digestion_status"}
                labelText="Digestion Status"
                options={generateOptions(Object.keys(DigestionStatusEnum))}
                placeholder="Digestion Status"
                title="Digestion Status"
                {...register("digestion_status")}
              />
              <Checkbox
                id={"easily_single_serving"}
                key={"easily_single_serving"}
                labelText={"easily_single_serving"}
                title="Easily Single Serving"
                {...register(`easily_single_serving`)}
              />
              <Checkbox
                id={"makes_leftovers"}
                key={"makes_leftovers"}
                labelText={"makes_leftovers"}
                title="Makes good leftovers"
                {...register(`makes_leftovers`)}
              />
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
            handleSubmit={() => handleSubmit(onSubmit)}
            text="Create"
            action="submit"
            type="Submit"
            isLoading={isSubmitting}
          />
        </div>
      </form>
    </>
  );
};
export default RecipeCreate;
