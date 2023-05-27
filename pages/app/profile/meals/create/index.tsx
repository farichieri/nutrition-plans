import {
  MealComplexities,
  MealComplexitiesType,
  MealCook,
  MealMinutes,
  MealMinutesType,
  MealSizes,
  MealSizesType,
  NewMealSetting,
  UserMeal,
} from "@/types/mealsSettingsTypes";
import {
  selectMealsSlice,
  setAddNewMealSetting,
  setNewMealState,
} from "@/store/slices/mealsSlice";
import { createMealSetting } from "@/firebase/helpers/Meals";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import BackButton from "@/components/Back/BackButton";
import FormAction from "@/components/Form/FormAction";
import Input from "@/components/Form/Input";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import Select from "@/components/Form/Select";
import SubPremiumNav from "@/components/Layout/SubPremiumNav";

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
    const type = event.target.type;
    const name = event.target.name;
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

  return (
    <PremiumLayout>
      <section className="flex w-full select-none flex-col gap-[var(--nav-h)]">
        <SubPremiumNav>
          <BackButton />
          <span>Create Meal Setting</span>
        </SubPremiumNav>
        <div className="flex max-w-xl flex-col items-center justify-start gap-5 bg-white px-4 pb-4 pt-4 shadow-[0_1px_5px_lightgray] dark:bg-black dark:shadow-[0_1px_6px_#292929] sm:m-[0.5vw] sm:min-h-[calc(100vh_-_6rem_-_1vw)] sm:gap-5 sm:rounded-lg sm:border sm:px-10">
          <form
            className="mb-4 mt-4 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div className="flex w-full flex-wrap gap-5">
              <div className="w-full max-w-xl flex-col">
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
              <div className="w-full max-w-xl flex-col">
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
              <div className="w-full max-w-xl flex-col">
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
              <div className="w-full max-w-xl flex-col">
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
              <div className="w-full max-w-xl flex-col">
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

            <div className="m-auto flex max-w-xl  gap-2">
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
      </section>
    </PremiumLayout>
  );
}
