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
  addNewFood,
} from "@/features/foods";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { FC, useEffect, useState } from "react";
import { generateOptions } from "@/utils";
import { getNutritionMerged, getRecipeSize } from "@/utils/nutritionHelpers";
import { NewFood } from "@/types/initial";
import { schema } from "./utils";
import { selectAuthSlice } from "@/features/authentication";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "@/components/Form/Checkbox";
import FormAction from "@/components/Form/FormAction";
import FormInput from "@/components/Form/FormInput";
import FormSelect from "@/components/Form/FormSelect";
import Image from "next/image";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import NutritionInput from "@/components/Form/NutritionInput";
import RecipeNutrition from "./RecipeNutrition";
import TranspLoader from "@/components/Loader/TranspLoader";

interface FormValues extends Recipe {}

interface Props {}
const RecipeCreate: FC<Props> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { newRecipeState } = useSelector(selectFoodsSlice);
  const { user } = useSelector(selectAuthSlice);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setValue("imageURL", blob);
      setNewImageFile(file);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!user || isSubmitting) return;
    const recipeGrams = getRecipeSize(data.ingredients);
    if (!recipeGrams) return;
    setIsLoading(true);
    const newFood: Recipe = {
      ...data,
      servingGrams: recipeGrams,
    };
    const res = await addFood(newFood, FoodKind.recipe, newImageFile, user);
    if (res.result === "success") {
      setNewImageFile(undefined);
      dispatch(setNewRecipeState(NewFood));
      dispatch(addNewFood(res.data));
      router.push(`/app/food/${res.data.id}`);
      toast.success("Recipe created successfully");
    } else {
      toast.error("Error creating Recipe");
      setIsLoading(false);
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
      {(isSubmitting || isLoading) && (
        <TranspLoader text={"Creating Recipe..."} />
      )}

      <form
        noValidate
        className="flex w-full flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-wrap lg:divide-x">
          <div className="mb-5 flex w-full max-w-xl flex-col gap-5 sm:px-4">
            <div className="flex flex-col gap-2 ">
              <FormInput
                error={errors.name?.message}
                id={"name"}
                labelText="Recipe Name"
                placeholder="Recipe Name"
                title="Recipe Name"
                type="text"
                {...register("name")}
              />
              <FormInput
                error={errors.description?.message}
                id={"description"}
                labelText="Recipe Description"
                placeholder="Recipe Description"
                title="Recipe Description"
                type="text"
                {...register("description")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl">Image</h1>
              <Image
                src={values.imageURL}
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
                <p>{errors.imageURL?.message}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-normal">Recipe Properties:</span>
              <NutritionInput
                changed={false}
                error={errors.prepTime?.message}
                handleChange={() => {}}
                id={"prepTime"}
                labelText="Prep Time"
                title={"Prep Time"}
                type="number"
                unit={"minutes"}
                value={values.prepTime}
                {...register("prepTime", { valueAsNumber: true, min: 0 })}
              />
              <NutritionInput
                changed={false}
                error={errors.cookTime?.message}
                handleChange={() => {}}
                id={"cookTime"}
                labelText="Cook Time"
                title={"Cook Time"}
                type="number"
                unit={"minutes"}
                value={values.cookTime}
                {...register("cookTime", { valueAsNumber: true, min: 0 })}
              />
              <NutritionInput
                changed={false}
                error={errors.servingAmount?.message}
                handleChange={() => {}}
                id={"servingAmount"}
                labelText="Yields"
                title={"Yields"}
                type="number"
                unit={"servings"}
                value={values.servingAmount}
                {...register("servingAmount", { valueAsNumber: true, min: 0 })}
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
                error={errors.category?.message}
                handleChange={() => {}}
                id={"category"}
                labelText="Recipe Category"
                options={generateOptions(Object.keys(RecipeCategoriesEnum))}
                placeholder="Recipe Category"
                title="Recipe Category"
                {...register("category")}
              />
              <FormSelect
                error={errors.dishType?.message}
                handleChange={() => {}}
                id={"dishType"}
                labelText="Dish Type"
                options={generateOptions(Object.keys(DishTypesEnum))}
                placeholder="Dish Type"
                title="Dish Type"
                {...register("dishType")}
              />
              <div>
                <h1 className="text-xl">Food Type</h1>
                <div className="flex flex-col gap-1">
                  {Object.keys(values.type).map((type) => {
                    return (
                      <Checkbox
                        id={type}
                        key={type}
                        labelText={type}
                        placeholder="Food Type"
                        title="Food Type"
                        {...register(`type.${type as keyof FoodType}`)}
                      />
                    );
                  })}
                </div>
                <div className="text-red-500">
                  <span>{errors.type?.message}</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl">Compatible Plans</h1>
                <div className="flex flex-col gap-1">
                  {Object.keys(values.compatiblePlans).map((plan) => {
                    return (
                      <Checkbox
                        id={plan}
                        key={plan}
                        labelText={plan}
                        placeholder="Compatible Plans"
                        title="Compatible Plans"
                        {...register(
                          `compatiblePlans.${plan as keyof CompatiblePlans}`
                        )}
                      />
                    );
                  })}
                </div>
                <div className="text-red-500">
                  <span>{errors.compatiblePlans?.message}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-xl flex-col gap-5 sm:px-4">
            <div className="flex max-w-xl flex-col gap-2 rounded-md border p-2">
              <div className="flex items-center gap-1">
                <BiSolidPieChartAlt2 className="h-6 w-6 text-green-500" />
                <span className="text-2xl font-semibold">
                  Nutrition Targets
                </span>
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
                <span>{errors?.ingredients?.message?.toString()}</span>
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
                error={errors.digestionStatus?.message}
                handleChange={() => {}}
                id={"digestionStatus"}
                labelText="Digestion Status"
                options={generateOptions(Object.keys(DigestionStatusEnum))}
                placeholder="Digestion Status"
                title="Digestion Status"
                {...register("digestionStatus")}
              />
              <Checkbox
                id={"isEasilySingleServing"}
                key={"isEasilySingleServing"}
                labelText={"isEasilySingleServing"}
                title="Easily Single Serving"
                {...register(`isEasilySingleServing`)}
              />
              <Checkbox
                id={"makesLeftovers"}
                key={"makesLeftovers"}
                labelText={"makesLeftovers"}
                title="Makes good leftovers"
                {...register(`makesLeftovers`)}
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
