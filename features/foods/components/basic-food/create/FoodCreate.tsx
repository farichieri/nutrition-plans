import {
  fatsNutritionFields,
  firstNutritionFields,
  sugarNutritionFields,
  vitsAndMinsNutritionFields,
} from "./formFields";
import {
  FoodNutrients,
  CompatiblePlans,
  FoodType,
  FoodKind,
  selectFoodsSlice,
  FoodScales,
  GlucemicStatusEnum,
  FoodCategoriesEnum,
  DigestionStatusEnum,
  NutrientsEnum,
  Food,
  setNewFoodState,
  updateNewFoodState,
  usePostFoodMutation,
} from "@/features/foods";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { generateOptions } from "@/utils";
import { NewFood } from "@/features/foods";
import { schema } from "./utils";
import { selectAuthSlice } from "@/features/authentication/slice";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "@/components/Form/Checkbox";
import ExtraScales from "../../common/ExtraScales";
import FormAction from "@/components/Form/FormAction";
import FormInput from "@/components/Form/FormInput";
import FormSelect from "@/components/Form/FormSelect";
import Image from "next/image";
import NutritionInput from "@/components/Form/NutritionInput";
import React, { FC, useEffect, useState } from "react";
import TranspLoader from "@/components/Loader/TranspLoader";

interface FormValues extends Food {}

interface Props {}

const FoodCreate: FC<Props> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const { newFoodState } = useSelector(selectFoodsSlice);
  const [optionalsOpen, setOptionalsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let foodCategoryOptions = Object.keys(FoodCategoriesEnum);
  let foodGlucemicStatusOptions = Object.keys(GlucemicStatusEnum);
  let foodDigestionStatusOptions = Object.keys(DigestionStatusEnum);

  const form = useForm<FormValues>({
    defaultValues: newFoodState,
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

  const handleChangeNutrient = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setValue(name as keyof FoodNutrients, Number(value));
  };

  const handleChangeScales = (newScales: FoodScales) => {
    setValue("scales", [...newScales], { shouldDirty: true });
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

  const [postFood] = usePostFoodMutation();

  const onSubmit = async (data: FormValues) => {
    if (!user || isSubmitting || isLoading) return;
    setIsLoading(true);
    const res = await postFood({
      food: data,
      kind: FoodKind.basic_food,
      newImage: newImageFile,
      user,
    });
    if (!("error" in res)) {
      dispatch(setNewFoodState(NewFood));
      setNewImageFile(undefined);
      router.push(`/app/food/${res.data.id}`);
      toast.success("Food created successfully");
    } else {
      toast.error("Error creating food");
      setIsLoading(false);
    }
  };

  const handleCancel = async (event: React.FormEvent) => {
    event.preventDefault();
    reset(NewFood);
    setNewImageFile(undefined);
    dispatch(setNewFoodState(NewFood));
  };

  let nutrientKeys: any = {};
  Object.keys(NutrientsEnum).forEach((key) => {
    nutrientKeys[key] = key;
  });

  const getNutritionInputs = (fields: string[]) => {
    return fields.map((nutrient) => (
      <NutritionInput
        changed={watch(`nutrients.${nutrient as keyof FoodNutrients}`)}
        error={errors.nutrients?.[nutrient as keyof FoodNutrients]?.message}
        handleChange={handleChangeNutrient}
        id={nutrient}
        key={nutrient}
        labelText={nutrient}
        title={nutrient}
        type="number"
        value={values.nutrients[nutrient as keyof FoodNutrients]}
        {...register(`nutrients.${nutrient as keyof FoodNutrients}`)}
      />
    ));
  };

  useEffect(() => {
    const subscription = watch((formState, { name }) => {
      if (name) {
        const objName = name.split(".")[0];
        const value = formState[objName];
        dispatch(updateNewFoodState({ field: objName, value: value }));
      }
    });
    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  return (
    <>
      {(isSubmitting || isLoading) && (
        <TranspLoader text={"Creating Food..."} />
      )}
      <form
        noValidate
        className="flex w-full flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-wrap  xl:divide-x">
          <div className="mb-10 flex w-full max-w-xl flex-col gap-5 sm:px-4">
            <div className="flex flex-col gap-2">
              <FormInput
                error={errors.name?.message}
                id={"name"}
                labelText="Food Name"
                placeholder="Food Name"
                title="Food Name"
                type="text"
                {...register("name")}
              />
              <FormInput
                error={errors.description?.message}
                id={"description"}
                labelText="Food Description"
                placeholder="Food Description"
                title="Food Description"
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

            <div>
              <h1 className="text-xl">Serving size info</h1>
              <div className="flex flex-col gap-2">
                <FormInput
                  error={errors.nutrients?.calories?.message}
                  id={"nutrients.calories"}
                  labelText="Calories"
                  placeholder="Calories"
                  title="Calories"
                  type="number"
                  {...register("nutrients.calories", { valueAsNumber: true })}
                />
                <FormInput
                  error={errors.nutrients?.carbohydrates?.message}
                  id={"nutrients.carbohydrates"}
                  labelText="Carbohydrates"
                  placeholder="Carbohydrates"
                  title="Carbohydrates"
                  type="number"
                  {...register("nutrients.carbohydrates", {
                    valueAsNumber: true,
                    min: 0,
                  })}
                />
                <FormInput
                  error={errors.nutrients?.fats?.message}
                  id={"nutrients.fats"}
                  labelText="Fats"
                  placeholder="Fats"
                  title="Fats"
                  type="number"
                  {...register("nutrients.fats", { valueAsNumber: true })}
                />
                <FormInput
                  error={errors.nutrients?.proteins?.message}
                  id={"nutrients.proteins"}
                  labelText="Proteins"
                  placeholder="Proteins"
                  title="Proteins"
                  type="number"
                  {...register("nutrients.proteins", { valueAsNumber: true })}
                />
                <FormInput
                  error={errors.servingName?.message}
                  id={"servingName"}
                  labelText="Default Scale Name"
                  placeholder="Scale Name"
                  title="Scale Name"
                  type="text"
                  {...register("servingName")}
                />
                <FormInput
                  error={errors.servingGrams?.message}
                  id={"servingGrams"}
                  labelText="Equivalent Weight In Grams"
                  placeholder="Equivalent Weight In Grams"
                  title="Equivalent Weight In Grams"
                  type="number"
                  {...register("servingGrams", { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="my-5">
              <h1 className="text-xl">Extra scales {`(optional)`}</h1>
              <div className="relative">
                <ExtraScales
                  scales={values.scales}
                  handleChangeScales={handleChangeScales}
                />
              </div>
            </div>
            <div>
              <FormSelect
                error={errors.category?.message}
                id={"category"}
                labelText="Food Category"
                options={generateOptions(foodCategoryOptions)}
                placeholder="Food Category"
                title="Food Category"
                handleChange={() => {}}
                {...register("category")}
              />
            </div>
            <div>
              <h1 className="text-xl">Food Type</h1>
              <div className="flex flex-col gap-1">
                {Object.keys(values.type).map((type) => {
                  return (
                    <Checkbox
                      id={type}
                      key={type}
                      labelText={type.split("is")[1]}
                      placeholder="Food Type"
                      title="Food Type"
                      {...register(`type.${type as keyof FoodType}`)}
                    />
                  );
                })}
              </div>
              <div className="text-red-500">
                <p>{errors.type?.message}</p>
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
                <p>{errors.compatiblePlans?.message}</p>
              </div>
            </div>

            <div className="">
              <h1 className="text-xl">Optional Fields</h1>
              <div className="flex flex-col gap-2">
                <FormInput
                  error={errors.servingAmountPerPackage?.message}
                  id={"servingAmountPerPackage"}
                  labelText="Servings Per Package"
                  placeholder="Servings Per Package"
                  title="Servings Per Package"
                  type="number"
                  {...register("servingAmountPerPackage")}
                />
                <NutritionInput
                  changed={false}
                  error={errors.price?.message}
                  handleChange={() => {}}
                  id={"price"}
                  labelText="Price (optional)"
                  title="Price"
                  type="number"
                  unit={"U$D"}
                  value={values.price}
                  {...register("price", { valueAsNumber: true })}
                />
                <FormInput
                  error={errors.brand?.message}
                  id={"brand"}
                  labelText="Brand"
                  placeholder="Brand"
                  title="Brand"
                  type="text"
                  {...register("brand")}
                />
                <FormInput
                  error={errors.source?.message}
                  id={"source"}
                  labelText="Source"
                  placeholder="Source"
                  title="Source"
                  type="text"
                  {...register("source")}
                />
                <FormSelect
                  error={errors.glucemicStatus?.message}
                  handleChange={() => {}}
                  id={"glucemicStatus"}
                  labelText="Glucemic Statis"
                  options={generateOptions(foodGlucemicStatusOptions)}
                  placeholder="Glucemic Statis"
                  title="Glucemic Statis"
                  {...register("glucemicStatus")}
                />
                <FormSelect
                  error={errors.digestionStatus?.message}
                  handleChange={() => {}}
                  id={"digestionStatus"}
                  labelText="Digestion Status"
                  options={generateOptions(foodDigestionStatusOptions)}
                  placeholder="Digestion Status"
                  title="Digestion Status"
                  {...register("digestionStatus")}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full max-w-xl flex-col gap-5 sm:px-4">
            <div className="w-full">
              <div className="flex flex-col rounded-md ">
                <div
                  className="flex w-fit cursor-pointer items-center gap-5 "
                  onClick={() => setOptionalsOpen(!optionalsOpen)}
                >
                  <span className="text-xl font-semibold">
                    Optional Nutrition Fields
                  </span>
                  <ChevronDownIcon
                    className={`h-5 w-5 duration-300 ease-in-out ${
                      optionalsOpen && "-rotate-180 transform fill-green-500"
                    }`}
                  />
                </div>
                <div
                  className={`mt-5 flex flex-col gap-5 overflow-hidden pl-1 text-sm transition-[max-height] duration-1000 ease-in-out sm:text-base ${
                    optionalsOpen ? " max-h-[800vh]" : "max-h-0"
                  }`}
                >
                  <div>
                    <h1 className="text-xl"></h1>
                    <div className="flex flex-col gap-1">
                      {getNutritionInputs(firstNutritionFields)}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-xl">Sugar types</h1>
                    <div className="flex flex-col gap-1">
                      {getNutritionInputs(sugarNutritionFields)}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-xl">Fats types</h1>
                    <div className="flex flex-col gap-1">
                      {getNutritionInputs(fatsNutritionFields)}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-xl">Vitamines and Minerals</h1>
                    <div className="flex flex-col gap-1">
                      {getNutritionInputs(vitsAndMinsNutritionFields)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex gap-2">
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
export default FoodCreate;
