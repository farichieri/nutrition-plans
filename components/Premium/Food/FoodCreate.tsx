import { Food } from "@/types/foodTypes";
import {
  nameDescFields,
  optionalNutritionFields,
  servingSizeFields,
  servingsPerPackage,
} from "./formFields";
import { NewFood } from "@/types/initialTypes";
import FormAction from "@/components/Form/FormAction";
import Input from "@/components/Form/Input";
import React, { FC, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import NutritionInput from "@/components/Form/NutritionInput";

interface Props {}

const FoodCreate: FC<Props> = () => {
  const [foodState, setFoodState] = useState<Food>(NewFood);
  const [optionalsOpen, setOptionalsOpen] = useState<boolean>(false);
  console.log({ NewFood });
  console.log({ foodState });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;
    console.log({ id });
    console.log({ value });
    setFoodState({ ...foodState, [id]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className="mt-8 flex max-w-xl flex-col gap-10">
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
      </div>
      <div className="">
        <h1 className="text-xl">Package Info</h1>
        <div className="">
          {servingsPerPackage.map((field) => (
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
      </div>
      <div className="">
        <div
          className="flex w-full cursor-pointer items-center gap-2"
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
          className={`flex flex-col overflow-hidden pl-1 text-sm transition-[max-height] duration-1000 ease-in-out sm:text-base ${
            optionalsOpen ? " max-h-[800vh]" : "max-h-0"
          }`}
        >
          {optionalNutritionFields.map((field) => (
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
            />
          ))}
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
