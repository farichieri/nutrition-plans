import {
  selectMealsSlice,
  setAddNewMealSetting,
  setAddNewUserMeal,
  setDeleteMealSetting,
  deleteMealSetting,
  updateMealSetting,
  updateUserMeal,
  MealComplexities,
  MealComplexitiesType,
  MealCook,
  MealMinutes,
  MealMinutesType,
  MealSizes,
  MealSizesType,
  UserMeal,
} from "@/features/meals";
import { ButtonType } from "@/types";
import { GetServerSideProps } from "next";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import ActionButton from "@/components/Buttons/ActionButton";
import FormAction from "@/components/Form/FormAction";
import Input from "@/components/Form/Input";
import MealsLayout from "@/layouts/MealsLayout";
import Modal from "@/components/Modal/Modal";
import Select from "@/components/Form/Select";
import { generateOptions } from "@/utils";

interface Props {
  mealID: string;
}
export default function Page({ mealID }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { mealsSettings, meals } = useSelector(selectMealsSlice);
  const [isDeleting, setIsDeleting] = useState(false);
  const meal = mealsSettings[mealID];
  const [mealState, setMealState] = useState(meal);
  const sizeOptions = Object.keys(MealSizes).filter((i) => isNaN(Number(i)));
  const timeOptions = Object.keys(MealMinutes).filter((i) => isNaN(Number(i)));
  const complexityOptions = Object.keys(MealComplexities).filter((i) =>
    isNaN(Number(i))
  );
  const cookOptions = Object.values(MealCook);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    } else if (id === "cook") {
      setMealState({
        ...mealState,
        cook: value === "yes" ? true : false,
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
      const res = await updateMealSetting(user, mealState);
      const { result } = res;
      if (result === "success") {
        const mealUpdated = res.data;
        dispatch(setAddNewMealSetting(mealUpdated));
        const updateUserMeals = async () => {
          Object.keys(meals).map(async (meal_id) => {
            let meal = meals[meal_id];
            if (meal.setting_id === mealUpdated.id) {
              meal = {
                ...mealUpdated,
                order: meal.order,
                id: meal.id,
                setting_id: mealUpdated.id,
              };
              const res = await updateUserMeal(user, meal);
              if (res.result === "error")
                throw new Error("Error updating userMeal");
              const mealSuccessfulyUpdated = res.data;
              dispatch(setAddNewUserMeal(mealSuccessfulyUpdated));
            }
          });
        };
        await updateUserMeals();
        router.push(`/app/profile/meals`);
      } else {
        alert("Error updating meal");
      }
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
      console.log({ error });
    }
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      if (!user) return;
      setIsDeleting(true);
      const res = await deleteMealSetting(user, meal);
      if (res.result === "success") {
        router.push("/app/profile/meals").then(() => {
          dispatch(setDeleteMealSetting(meal));
        });
      } else {
        alert("Error deleting meal");
      }
      setIsDeleting(false);
    } catch (error) {
      setIsDeleting(false);
      console.log({ error });
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
                  labelFor={"name"}
                  labelText={"Meal Name"}
                  name={"name"}
                  title={"Meal Name"}
                  type={"text"}
                  value={mealState["name" as keyof UserMeal]}
                />
              </div>
              <div className="w-full flex-col">
                <Select
                  customClass={""}
                  handleChange={handleChange}
                  id={"size"}
                  isRequired={true}
                  labelFor={"size"}
                  labelText={"Meal Size"}
                  name={"size"}
                  title={"Meal Size"}
                  options={generateOptions(sizeOptions)}
                  value={MealSizes[mealState["size"]]}
                />
              </div>
              <div className="w-full flex-col">
                <Select
                  customClass={""}
                  handleChange={handleChange}
                  id={"time"}
                  isRequired={true}
                  labelFor={"time"}
                  labelText={"Available Time"}
                  name={"time"}
                  title={"Meal Time"}
                  options={generateOptions(timeOptions)}
                  value={MealMinutes[mealState["time"]]}
                />
              </div>
              <div className="w-full flex-col">
                <Select
                  customClass={""}
                  handleChange={handleChange}
                  id={"complexity"}
                  isRequired={true}
                  labelFor={"complexity"}
                  labelText={"complexity"}
                  name={"complexity"}
                  title={"Meal Complexity"}
                  options={generateOptions(complexityOptions)}
                  value={MealComplexities[mealState["complexity"]]}
                />
              </div>
              <div className="w-full flex-col">
                <Select
                  customClass={""}
                  handleChange={handleChange}
                  id={"cook"}
                  isRequired={true}
                  labelFor={"cook"}
                  labelText={"cook"}
                  name={"cook"}
                  title={"Meal cook"}
                  options={generateOptions(cookOptions)}
                  value={mealState["cook"] ? MealCook.yes : MealCook.no}
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
              type={ButtonType.delete}
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
