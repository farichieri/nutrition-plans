"use client";

import { GetServerSideProps } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

import ActionButton from "@/components/Buttons/ActionButton";
import FormAction from "@/components/Form/FormAction";
import FormSelect from "@/components/Form/FormSelect";
import Input from "@/components/Form/Input";
import Modal from "@/components/Modal/Modal";
import { selectAuthSlice } from "@/features/authentication";
import {
  MealComplexities,
  MealComplexitiesType,
  MealCook,
  MealMinutes,
  MealMinutesType,
  MealSizes,
  MealSizesType,
  UserMeal,
  selectMealsSlice,
  useDeleteMealSettingMutation,
  useUpdateMealSettingMutation,
  useUpdateUserMealMutation,
} from "@/features/meals";
import MealsLayout from "@/layouts/MealsLayout";
import { generateOptions } from "@/utils";
interface Props {
  mealID: string;
}
export default function Page({ mealID }: Props) {
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const { mealsSettings, meals } = useSelector(selectMealsSlice);
  const meal = mealsSettings[mealID];
  const [mealState, setMealState] = useState(meal);
  const sizeOptions = Object.keys(MealSizes).filter((i) => isNaN(Number(i)));
  const timeOptions = Object.keys(MealMinutes).filter((i) => isNaN(Number(i)));
  const complexityOptions = Object.keys(MealComplexities).filter((i) =>
    isNaN(Number(i))
  );
  const cookOptions = Object.values(MealCook);
  const [isSaving, setIsSaving] = useState(false);
  const [updateMealSetting] = useUpdateMealSettingMutation();
  const [updateUserMeal] = useUpdateUserMealMutation();
  const [deleteMealSetting, { isLoading: isDeleting }] =
    useDeleteMealSettingMutation();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.preventDefault();
    const type = event.target.type;
    const id = event.target.id;
    const value = event.target.value;
    const valueF = type === "number" ? Number(value) : value;

    if (id === "size") {
      const newSize = Number(MealSizes[value as keyof MealSizesType]);
      setMealState({
        ...mealState,
        size: newSize,
      });
    } else if (id === "time") {
      const newTime = Number(MealMinutes[value as keyof MealMinutesType]);
      setMealState({
        ...mealState,
        time: newTime,
      });
    } else if (id === "complexity") {
      const newComplexity = Number(
        MealComplexities[value as keyof MealComplexitiesType]
      );
      setMealState({
        ...mealState,
        complexity: newComplexity,
      });
    } else if (id === "isCookeable") {
      setMealState({
        ...mealState,
        isCookeable: value === "yes" ? true : false,
      });
    } else {
      setMealState({ ...mealState, [id]: valueF });
    }
  };

  const handleCancel = async (event: React.FormEvent) => {
    event.preventDefault();
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!user) return;
      if (isSaving) return;
      setIsSaving(true);
      const res = await updateMealSetting({ user, mealSetting: mealState });
      if (!("error" in res)) {
        const mealUpdated = res.data;
        const updateUserMeals = async () => {
          Object.keys(meals).map(async (meal_id) => {
            let meal = meals[meal_id];
            if (meal.mealSettingId === mealUpdated.id) {
              meal = {
                ...mealUpdated,
                order: meal.order,
                id: meal.id,
                mealSettingId: mealUpdated.id,
              };
              const res = await updateUserMeal({ user, userMeal: meal });
              if ("error" in res) {
                throw new Error("Error updating userMeal");
              }
            }
          });
        };
        await updateUserMeals();
        router.push(`/app/profile/meals`);
        toast.success("Meal Template updated successfully.");
      } else {
        toast.error("Error updating Meal Template.");
      }
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
      console.error(error);
    }
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      if (!user) return;
      const res = await deleteMealSetting({ user, mealSetting: meal });
      if (!("error" in res)) {
        router.push("/app/profile/meals");
        toast.success("Meal Template deleted successfully.");
      } else {
        toast.error("Error deleting Meal Template.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = () => {
    router.back();
  };

  return (
    <MealsLayout>
      <Modal onClose={onClose}>
        <div className="flex w-xs max-w-[95vw] flex-col gap-5 px-4 py-8 sm:w-md sm:px-10">
          <span className="text-2xl font-semibold">Edit Meal Setting</span>
          <form
            className="mb-4 mt-4 flex h-full w-full flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div className="flex w-full flex-col gap-5">
              <div className="w-full flex-col">
                <Input
                  handleChange={handleChange}
                  id={"name"}
                  isRequired={true}
                  labelFor="name"
                  labelText={"Meal Name"}
                  name={"name"}
                  title={"Meal Name"}
                  type={"text"}
                  value={mealState["name" as keyof UserMeal]}
                />
              </div>
              <div className="w-full flex-col">
                <FormSelect
                  customClass={""}
                  handleChange={handleChange}
                  id={"size"}
                  isRequired={true}
                  labelText={"Meal Size"}
                  name={"size"}
                  title={"Meal Size"}
                  options={generateOptions(sizeOptions)}
                  value={MealSizes[mealState["size"]]}
                />
              </div>
              <div className="w-full flex-col">
                <FormSelect
                  customClass={""}
                  handleChange={handleChange}
                  id={"time"}
                  isRequired={true}
                  labelText={"Available Time"}
                  name={"time"}
                  title={"Meal Time"}
                  options={generateOptions(timeOptions)}
                  value={MealMinutes[mealState["time"]]}
                />
              </div>
              <div className="w-full flex-col">
                <FormSelect
                  customClass={""}
                  handleChange={handleChange}
                  id={"complexity"}
                  isRequired={true}
                  labelText={"complexity"}
                  name={"complexity"}
                  title={"Meal Complexity"}
                  options={generateOptions(complexityOptions)}
                  value={MealComplexities[mealState["complexity"]]}
                />
              </div>
              <div className="w-full flex-col">
                <FormSelect
                  customClass={""}
                  handleChange={handleChange}
                  id={"isCookeable"}
                  isRequired={true}
                  labelText={"isCookeable"}
                  name={"isCookeable"}
                  title={"Meal cook"}
                  options={generateOptions(cookOptions)}
                  value={mealState["isCookeable"] ? MealCook.Yes : MealCook.No}
                />
              </div>
            </div>

            <div className="mx-auto mt-auto flex gap-2">
              <FormAction
                handleSubmit={handleCancel}
                text="Discard"
                action="submit"
                type="Cancel"
                isLoading={false}
              />
              <FormAction
                handleSubmit={handleSubmit}
                text="Save"
                action="submit"
                type="Submit"
                isLoading={isSaving}
              />
            </div>
          </form>
          <div className="flex flex-col gap-2 border-t pt-4">
            <span className="opacity-70">Danger zone:</span>
            <ActionButton
              loadMessage="Deleting..."
              content="Delete Meal Setting"
              isLoading={isDeleting}
              isDisabled={false}
              type={"delete"}
              className="mt-auto w-44"
              onClick={handleDelete}
              action="submit"
            />
          </div>
        </div>
      </Modal>
    </MealsLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { mealID } = context?.query;

  return { props: { mealID } };
};
