import FormAction from "@/components/Form/FormAction";
import FormSelect from "@/components/Form/FormSelect";
import Input from "@/components/Form/Input";
import Modal from "@/components/Modal/Modal";
import { selectAuthSlice } from "@/features/authentication";
import { FoodTypesEnum } from "@/features/foods";
import {
  MealComplexities,
  MealComplexitiesType,
  MealCook,
  MealMinutes,
  MealMinutesType,
  MealSizes,
  MealSizesType,
  NewMealSetting,
  selectMealsSlice,
  setNewMealState,
  usePostMealSettingMutation,
  UserMeal,
} from "@/features/meals";
import MealsLayout from "@/layouts/MealsLayout";
import { generateOptions } from "@/utils";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const { newMealState } = useSelector(selectMealsSlice);
  const sizeOptions = Object.keys(MealSizes).filter((i) => isNaN(Number(i)));
  const typeOptions = Object.keys(FoodTypesEnum).filter((i) =>
    isNaN(Number(i))
  );
  const timeOptions = Object.keys(MealMinutes).filter((i) => isNaN(Number(i)));
  const complexityOptions = Object.keys(MealComplexities).filter((i) =>
    isNaN(Number(i))
  );
  const cookOptions = Object.values(MealCook);
  const [postMealSetting, { isLoading: isCreating }] =
    usePostMealSettingMutation();

  if (!user) return;

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
    } else if (id === "isCookeable") {
      dispatch(
        setNewMealState({
          ...newMealState,
          isCookeable: value === "yes" ? true : false,
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
    if (isCreating) return;
    const res = await postMealSetting({ user, mealSetting: newMealState });
    if (!("error" in res)) {
      dispatch(setNewMealState(NewMealSetting));
      router.push(`/app/profile/meals`);
      toast.success("Meal Template created successfully.");
    } else {
      toast.error("Error creating Meal Template.");
    }
  };

  const onClose = () => {
    router.back();
  };

  return (
    <MealsLayout>
      <Modal onClose={onClose}>
        <div className="flex w-xs max-w-[95vw] flex-col gap-5 px-4 py-8 sm:w-md sm:px-10">
          <span className="text-2xl font-semibold">Create Meal Template</span>
          <form
            className="mb-4 mt-4 flex h-full w-full flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div className="flex w-full flex-col gap-5">
              <div className="w-full flex-col">
                <Input
                  handleChange={handleChange}
                  id={"name"}
                  labelFor="id"
                  isRequired={true}
                  labelText={"Meal Name"}
                  name={"name"}
                  title={"Meal Name"}
                  type={"text"}
                  value={newMealState["name" as keyof UserMeal]}
                />
              </div>
              <div className="w-full flex-col">
                <FormSelect
                  customClass={""}
                  handleChange={handleChange}
                  id={"type"}
                  isRequired={true}
                  labelText={"Meal Type"}
                  name={"type"}
                  title={"Meal Type"}
                  options={generateOptions(typeOptions)}
                  value={FoodTypesEnum.isBreakfast}
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
                  value={MealSizes[newMealState["size"]]}
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
                  value={MealMinutes[newMealState["time"]]}
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
                  value={MealComplexities[newMealState["complexity"]]}
                />
              </div>
              <div className="w-full flex-col">
                <FormSelect
                  customClass={""}
                  handleChange={handleChange}
                  id={"isCookeable"}
                  isRequired={true}
                  labelText={"Cookeable"}
                  name={"isCookeable"}
                  title={"Meal cook"}
                  options={generateOptions(cookOptions)}
                  value={
                    newMealState["isCookeable"] ? MealCook.Yes : MealCook.No
                  }
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
