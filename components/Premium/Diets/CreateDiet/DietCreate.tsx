import {
  selectCreateDietSlice,
  setDietState,
} from "@/store/slices/createDietSlice";
import { CompatiblePlans } from "@/types/foodTypes";
import { createDiet } from "@/firebase/helpers/Diet";
import { Diet, NewDiet } from "@/types/dietTypes";
import { FC, useState } from "react";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@/components/Form/Checkbox";
import DietMeals from "./DietMeals";
import FormAction from "@/components/Form/FormAction";
import IngredientsNutrition from "../../Ingredients/IngredientsNutrition";
import Input from "@/components/Form/Input";

interface Props {}

const DietCreate: FC<Props> = () => {
  const dispatch = useDispatch();
  const { dietState } = useSelector(selectCreateDietSlice);
  const { user } = useSelector(selectAuthSlice);
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    if (isCreating) return;
    setIsCreating(true);
    // const recipeGrams = getRecipeSize(dietState.ingredients);
    const newDiet: Diet = {
      ...dietState,
      num_meals: Object.keys(dietState.diet_meals).length,
    };
    const res = await createDiet(newDiet, user);
    if (!res?.error && res?.diet_id) {
      dispatch(setDietState(NewDiet));
      alert("Diet created successfully");
      // router.push(`/app/food/${res.diet_id}`);
    } else {
      alert("Error creating recipe");
    }
    setIsCreating(false);
  };

  const handleCancel = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setDietState(NewDiet));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.type;
    const name = event.target.name;
    const id = event.target.id;
    const value = event.target.value;
    const valueF = type === "number" ? Number(value) : value;

    if (name === "compatible_plans") {
      let foodTypes = { ...dietState.compatible_plans };
      let foodTypesUpdated = {
        ...foodTypes,
        [id]: !foodTypes[id as keyof CompatiblePlans],
      };
      dispatch(
        setDietState({ ...dietState, compatible_plans: foodTypesUpdated })
      );
    } else {
      dispatch(setDietState({ ...dietState, [id]: valueF }));
    }
  };

  return (
    <form className="mb-4 mt-4 flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex w-full flex-wrap gap-10">
        <div className="w-full max-w-xl flex-col">
          <div>
            <span className="text-3xl font-semibold">Create Diet</span>
          </div>
          <div className="flex flex-col">
            <Input
              handleChange={handleChange}
              id={"diet_name"}
              isRequired={true}
              labelFor={"diet_name"}
              labelText={"Name"}
              name={"diet_name"}
              title={"Diet Name"}
              type={"text"}
              value={dietState["diet_name" as keyof Diet]}
            />
            <Input
              handleChange={handleChange}
              id={"diet_description"}
              isRequired={true}
              labelFor={"diet_description"}
              labelText={"Description"}
              name={"diet_description"}
              title={"Diet Description"}
              type={"text"}
              value={dietState["diet_description"] || ""}
            />
          </div>
          <div className="my-5 flex flex-col">
            <h1 className="text-xl">Compatible plans</h1>
            <div className="">
              {Object.keys(dietState.compatible_plans).map((type) => (
                <Checkbox
                  key={type}
                  customClass={""}
                  handleChange={handleChange}
                  id={type}
                  isRequired={false}
                  labelFor={type}
                  labelText={type}
                  name={"compatible_plans"}
                  title={type}
                  value={dietState["compatible_plans" as keyof Diet][type]}
                />
              ))}
            </div>
          </div>
          <div className="mt-5 flex w-full max-w-xl flex-col gap-2 rounded-md border p-2">
            <div className="flex items-center gap-1">
              <span className="material-icons-outlined text-green-500">
                data_usage
              </span>
              <span className="text-2xl font-semibold">Nutrition Values</span>
            </div>
            {Object.keys(dietState.diet_nutrients).length > 0 && (
              <IngredientsNutrition diet={dietState} />
            )}
          </div>
        </div>

        <div className="flex w-full max-w-xl flex-col gap-1 ">
          <h1 className="text-xl">Meals</h1>
          <DietMeals dietMeals={dietState.diet_meals} />
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
  );
};

export default DietCreate;
