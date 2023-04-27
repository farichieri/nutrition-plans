import { Food, FoodNutrients } from "@/types/foodTypes";
import {
  fatsFields,
  firstOptionalFields,
  foodCategorySelect,
  nameDescFields,
  servingSizeFields,
  servingsPerPackage,
  sugarFields,
  vitsAndMinsFields,
} from "./formFields";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { NewFood } from "@/types/initialTypes";
import FormAction from "@/components/Form/FormAction";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import React, { FC, useState } from "react";
import Select from "@/components/Form/Select";
import { addFood } from "@/firebase/helpers/Food";
import { useSelector } from "react-redux";
import { selectAuthSlice } from "@/store/slices/authSlice";

interface Props {}

const FoodCreate: FC<Props> = () => {
  const [foodState, setFoodState] = useState<Food>(NewFood);
  const [optionalsOpen, setOptionalsOpen] = useState<boolean>(false);
  const foodCategory = foodCategorySelect;
  const { user } = useSelector(selectAuthSlice);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;
    const name = event.target.name;
    if (name === "nutrient") {
      let nutrients = { ...foodState.nutrients };
      let nutrientsUpdated = {
        ...nutrients,
        [id]: Number(value) > 0 ? Number(value) : null,
      };
      setFoodState({ ...foodState, nutrients: nutrientsUpdated });
    } else {
      setFoodState({ ...foodState, [id]: value });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    const res = await addFood(user, foodState);
    console.log({ res });
    if (!res?.error) {
      setFoodState(NewFood);
      alert("Food created successfully");
    } else {
      alert("Error creating food");
    }
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
                value={
                  foodState["nutrients" as keyof FoodNutrients][foodCategory.id]
                }
              />
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
      <FormAction
        handleSubmit={handleSubmit}
        text="Create"
        action="submit"
        type="Button"
      />
    </form>
  );
};
export default FoodCreate;
