import {
  selectMealsSlice,
  setAddNewMealSetting,
  setNewMealState,
  MealComplexities,
  MealComplexitiesType,
  MealCook,
  MealMinutes,
  MealMinutesType,
  MealSizes,
  MealSizesType,
  NewMealSetting,
  UserMeal,
  createMealSetting,
} from "@/features/meals";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import FormAction from "@/components/Form/FormAction";
import Input from "@/components/Form/Input";
import MealsLayout from "@/layouts/MealsLayout";
import Modal from "@/components/Modal/Modal";
import Select from "@/components/Form/Select";

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const { newMealState } = useSelector(selectMealsSlice);
  const [isCreating, setIsCreating] = useState(false);
  const sizeOptions = Object.keys(MealSizes).filter((i) => isNaN(Number(i)));
  const timeOptions = Object.keys(MealMinutes).filter((i) => isNaN(Number(i)));
  const complexityOptions = Object.keys(MealComplexities).filter((i) =>
    isNaN(Number(i))
  );
  const cookOptions = Object.values(MealCook);

  if (!user) return;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const type = event.target.type;
    const id = event.target.id;
    const value = event.target.value;
    const valueF = type === "number" ? Number(value) : value;

    if (id === "size") {
      const newSize = Number(MealSizes[value as keyof MealSizesType]);
      dispatch(
        setNewMealState({
          ...newMealState,
          size: newSize,
        })
      );
    } else if (id === "time") {
      const newTime = Number(MealMinutes[value as keyof MealMinutesType]);
      dispatch(
        setNewMealState({
          ...newMealState,
          time: newTime,
        })
      );
    } else if (id === "complexity") {
      const newComplexity = Number(
        MealComplexities[value as keyof MealComplexitiesType]
      );
      dispatch(
        setNewMealState({
          ...newMealState,
          complexity: newComplexity,
        })
      );
    } else if (id === "cook") {
      dispatch(
        setNewMealState({
          ...newMealState,
          cook: value === "yes" ? true : false,
        })
      );
    } else {
      dispatch(setNewMealState({ ...newMealState, [id]: valueF }));
    }
  };

  const handleCancel = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setNewMealState(NewMealSetting));
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    if (isCreating) return;
    setIsCreating(true);
    const res = await createMealSetting(user, newMealState);
    if (!res?.error && res?.mealSettingAdded) {
      dispatch(setNewMealState(NewMealSetting));
      dispatch(setAddNewMealSetting(res.mealSettingAdded));
      router.push(`/app/profile/meals`);
    } else {
      alert("Error creating recipe");
    }
    setIsCreating(false);
  };

  const onClose = () => {
    router.back();
  };

  return (
    <MealsLayout>
      <Modal onClose={onClose}>
        <div className="flex w-xs max-w-[95vw] flex-col gap-5 px-4 py-8 sm:w-md sm:px-10">
          <span className="text-2xl font-semibold">Create Meal Setting</span>
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
                  value={newMealState["name" as keyof UserMeal]}
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
                  options={sizeOptions}
                  value={MealSizes[newMealState["size"]]}
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
                  options={timeOptions}
                  value={MealMinutes[newMealState["time"]]}
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
                  options={complexityOptions}
                  value={MealComplexities[newMealState["complexity"]]}
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
                  options={cookOptions}
                  value={newMealState["cook"] ? MealCook.yes : MealCook.no}
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
                text="Create"
                action="submit"
                type="Submit"
                isLoading={isCreating}
              />
            </div>
          </form>
        </div>
      </Modal>
    </MealsLayout>
  );
}
