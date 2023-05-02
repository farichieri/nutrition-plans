import {
  Food,
  FoodNutrients,
  FoodPreferences,
  FoodType,
} from "@/types/foodTypes";
import {
  fatsFields,
  firstOptionalFields,
  foodCategorySelect,
  foodGlucemicStatusSelect,
  nameDescFields,
  servingSizeFields,
  servingsPerPackage,
  sourceField,
  sugarFields,
  vitsAndMinsFields,
} from "./formFields";
import { addFood } from "@/firebase/helpers/Food";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { NewFood } from "@/types/initialTypes";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import Checkbox from "@/components/Form/Checkbox";
import FormAction from "@/components/Form/FormAction";
import Image from "next/image";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import React, { FC, useState } from "react";
import Select from "@/components/Form/Select";
import { useRouter } from "next/router";

interface Props {}

const FoodCreate: FC<Props> = () => {
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const [foodState, setFoodState] = useState<Food>(NewFood);
  const [optionalsOpen, setOptionalsOpen] = useState<boolean>(false);
  const foodCategory = foodCategorySelect;
  const glucemicStatus = foodGlucemicStatusSelect;
  const [isCreating, setIsCreating] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.type;
    const name = event.target.name;
    const id = event.target.id;
    const value = event.target.value;
    const valueF = type === "number" ? Number(value) : value;

    if (name === "food_type") {
      let foodTypes = { ...foodState.food_type };
      let foodTypesUpdated = {
        ...foodTypes,
        [id]: !foodTypes[id as keyof FoodType],
      };
      setFoodState({ ...foodState, food_type: foodTypesUpdated });
    } else if (name === "food_preferences") {
      let foodTypes = { ...foodState.food_preferences };
      let foodTypesUpdated = {
        ...foodTypes,
        [id]: !foodTypes[id as keyof FoodPreferences],
      };
      setFoodState({ ...foodState, food_preferences: foodTypesUpdated });
    } else if (name === "nutrient") {
      let nutrients = { ...foodState.nutrients };
      let nutrientsUpdated = {
        ...nutrients,
        [id]: Number(valueF) > 0 ? Number(valueF) : 0,
      };
      setFoodState({ ...foodState, nutrients: nutrientsUpdated });
    } else {
      setFoodState({ ...foodState, [id]: valueF });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    if (isCreating) return;
    setIsCreating(true);
    const res = await addFood(user, foodState, newImageFile);
    if (!res?.error && res?.food_id) {
      setNewImageFile(undefined);
      alert("Food created successfully");
      router.push(`/app/food/${res.food_id}`);
    } else {
      alert("Error creating food");
    }
    setIsCreating(false);
  };

  const [newImageFile, setNewImageFile] = useState<File | undefined>(undefined);

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && user) {
      const file = files[0];
      if (!file) return;
      const blob = URL.createObjectURL(file);
      setFoodState({
        ...foodState,
        image: blob,
      });
      setNewImageFile(file);
    }
  };

  const handleCancel = async (event: React.FormEvent) => {
    event.preventDefault();
    setFoodState(NewFood);
    setNewImageFile(undefined);
  };

  return (
    <form
      className="mt-8 flex max-w-xl flex-col gap-10"
      onSubmit={handleSubmit}
    >
      <div className="">
        <h1 className="text-xl">Create Custom Food</h1>
        {nameDescFields.map((field) => (
          <Input
            customClass={""}
            handleChange={handleChange}
            id={field.id}
            isRequired={field.isRequired}
            key={field.id}
            labelFor={field.labelFor}
            labelText={field.labelText}
            max={field.max}
            min={field.min}
            name={field.name}
            pattern={field.pattern}
            placeholder={field.placeholder}
            step={field.step}
            title={field.title}
            type={field.type}
            value={foodState[field.id]}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl">Image</h1>
        <Image
          src={foodState.image}
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
      </div>

      <div className="">
        <h1 className="text-xl">Serving size info</h1>
        <div className="">
          {servingSizeFields.map((field) => (
            <NutritionInput
              customClass={""}
              handleChange={handleChange}
              id={field.id}
              isRequired={field.isRequired}
              key={field.id}
              labelFor={field.labelFor}
              labelText={field.labelText}
              max={field.max}
              min={field.min}
              name={field.name}
              pattern={field.pattern}
              placeholder={field.placeholder}
              step={field.step}
              title={field.title}
              type={field.type}
              unit={field.unit}
              value={
                field.name === "nutrient"
                  ? foodState["nutrients" as keyof FoodNutrients][field.id]
                  : foodState[field.id]
              }
            />
          ))}
        </div>
      </div>
      <div className="">
        <h1 className="text-xl">Package Info</h1>
        <div className="">
          {servingsPerPackage.map((field) => (
            <NutritionInput
              customClass={""}
              handleChange={handleChange}
              id={field.id}
              isRequired={field.isRequired}
              key={field.id}
              labelFor={field.labelFor}
              labelText={field.labelText}
              max={field.max}
              min={field.min}
              name={field.name}
              pattern={field.pattern}
              placeholder={field.placeholder}
              step={field.step}
              title={field.title}
              type={field.type}
              value={foodState[field.id]}
              unit={field.unit}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col rounded-md ">
        <div
          className="flex w-fit cursor-pointer items-center gap-5 "
          onClick={() => setOptionalsOpen(!optionalsOpen)}
        >
          <h1 className="text-xl">Optional Nutrition Fields</h1>
          <ChevronDownIcon
            className={`h-5 w-5 duration-300 ease-in-out ${
              optionalsOpen && "-rotate-180 transform fill-green-500"
            }`}
          />
        </div>
        <div
          className={`mt-5 flex flex-col gap-10 overflow-hidden pl-1 text-sm transition-[max-height] duration-1000 ease-in-out sm:text-base ${
            optionalsOpen ? " max-h-[800vh]" : "max-h-0"
          }`}
        >
          <Input
            customClass={""}
            handleChange={handleChange}
            id={sourceField.id}
            isRequired={sourceField.isRequired}
            key={sourceField.id}
            labelFor={sourceField.labelFor}
            labelText={sourceField.labelText}
            max={sourceField.max}
            min={sourceField.min}
            name={sourceField.name}
            pattern={sourceField.pattern}
            placeholder={sourceField.placeholder}
            step={sourceField.step}
            title={sourceField.title}
            type={sourceField.type}
            value={foodState[sourceField.id]}
          />
          <div className="">
            <h1 className="text-xl"></h1>
            <div className="">
              <Select
                customClass={""}
                handleChange={handleChange}
                id={foodCategory.id}
                isRequired={foodCategory.isRequired}
                labelFor={foodCategory.labelFor}
                labelText={foodCategory.labelText}
                name={foodCategory.name}
                placeholder={foodCategory.placeholder}
                title={foodCategory.title}
                options={foodCategory.options}
                value={foodState[foodCategory.id]}
              />
            </div>
          </div>
          <div className="">
            <h1 className="text-xl"></h1>
            <div className="">
              <Select
                customClass={""}
                handleChange={handleChange}
                id={glucemicStatus.id}
                isRequired={glucemicStatus.isRequired}
                labelFor={glucemicStatus.labelFor}
                labelText={glucemicStatus.labelText}
                name={glucemicStatus.name}
                placeholder={glucemicStatus.placeholder}
                title={glucemicStatus.title}
                options={glucemicStatus.options}
                value={foodState[glucemicStatus.id]}
              />
            </div>
          </div>
          <div className="">
            <h1 className="text-xl">Food Type</h1>
            <div className="">
              {Object.keys(foodState.food_type).map((type) => (
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
                  value={foodState["food_type" as keyof FoodNutrients][type]}
                />
              ))}
            </div>
          </div>
          <div className="">
            <h1 className="text-xl">Food Preferences</h1>
            <div className="">
              {Object.keys(foodState.food_preferences).map((type) => (
                <Checkbox
                  key={type}
                  customClass={""}
                  handleChange={handleChange}
                  id={type}
                  isRequired={false}
                  labelFor={type}
                  labelText={type}
                  name={"food_preferences"}
                  title={type}
                  value={
                    foodState["food_preferences" as keyof FoodNutrients][type]
                  }
                />
              ))}
            </div>
          </div>
          <div className="">
            <h1 className="text-xl"></h1>
            <div className="">
              {firstOptionalFields.map((field) => (
                <NutritionInput
                  customClass={""}
                  handleChange={handleChange}
                  id={field.id}
                  isRequired={field.isRequired}
                  key={field.id}
                  labelFor={field.labelFor}
                  labelText={field.labelText}
                  max={field.max}
                  min={field.min}
                  name={field.name}
                  pattern={field.pattern}
                  placeholder={field.placeholder}
                  step={field.step}
                  title={field.title}
                  type={field.type}
                  unit={field.unit}
                  value={
                    foodState["nutrients" as keyof FoodNutrients][field.id]
                  }
                />
              ))}
            </div>
          </div>
          <div className="">
            <h1 className="text-xl">Sugar types</h1>
            <div className="">
              {sugarFields.map((field) => (
                <NutritionInput
                  customClass={""}
                  handleChange={handleChange}
                  id={field.id}
                  isRequired={field.isRequired}
                  key={field.id}
                  labelFor={field.labelFor}
                  labelText={field.labelText}
                  max={field.max}
                  min={field.min}
                  name={field.name}
                  pattern={field.pattern}
                  placeholder={field.placeholder}
                  step={field.step}
                  title={field.title}
                  type={field.type}
                  unit={field.unit}
                  value={
                    foodState["nutrients" as keyof FoodNutrients][field.id]
                  }
                />
              ))}
            </div>
          </div>
          <div className="">
            <h1 className="text-xl">Fats types</h1>
            <div className="">
              {fatsFields.map((field) => (
                <NutritionInput
                  customClass={""}
                  handleChange={handleChange}
                  id={field.id}
                  isRequired={field.isRequired}
                  key={field.id}
                  labelFor={field.labelFor}
                  labelText={field.labelText}
                  max={field.max}
                  min={field.min}
                  name={field.name}
                  pattern={field.pattern}
                  placeholder={field.placeholder}
                  step={field.step}
                  title={field.title}
                  type={field.type}
                  unit={field.unit}
                  value={
                    foodState["nutrients" as keyof FoodNutrients][field.id]
                  }
                />
              ))}
            </div>
          </div>
          <div className="">
            <h1 className="text-xl">Vitamines and Minerals</h1>
            <div className="">
              {vitsAndMinsFields.map((field) => (
                <NutritionInput
                  customClass={""}
                  handleChange={handleChange}
                  id={field.id}
                  isRequired={field.isRequired}
                  key={field.id}
                  labelFor={field.labelFor}
                  labelText={field.labelText}
                  max={field.max}
                  min={field.min}
                  name={field.name}
                  pattern={field.pattern}
                  placeholder={field.placeholder}
                  step={field.step}
                  title={field.title}
                  type={field.type}
                  unit={field.unit}
                  value={
                    foodState["nutrients" as keyof FoodNutrients][field.id]
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <FormAction
          handleSubmit={handleCancel}
          text="Cancel"
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
export default FoodCreate;
