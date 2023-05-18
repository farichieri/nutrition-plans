import {
  selectCreateDietSlice,
  setDietState,
} from "@/store/slices/createDietSlice";
import { CompatiblePlans } from "@/types/foodTypes";
import { Diet, NewDiet } from "@/types/dietTypes";
import { FC, useState } from "react";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@/components/Form/Checkbox";
import DietMeals from "./DietMeals";
import FormAction from "@/components/Form/FormAction";
import Input from "@/components/Form/Input";
import Ingredients from "../../Ingredients/Ingredients";

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
      // serving_grams: recipeGrams,
    };
    // const res = await addFood(newDiet, FoodKind.recipe, newImageFile, user);
    // if (!res?.error && res?.food_id) {
    //   dispatch(setDietState(NewDiet));
    //   alert("Recipe created successfully");
    //   router.push(`/app/food/${res.food_id}`);
    // } else {
    //   alert("Error creating recipe");
    // }
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
    <form
      className="mb-[100vh] mt-8 flex max-w-xl flex-col gap-2"
      onSubmit={handleSubmit}
    >
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
      <div className="flex flex-col gap-5">
        <span className="text-3xl font-normal">Diet Properties:</span>
        <div className="">
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
      </div>
      <div className="flex flex-col gap-5">
        <div className="">
          <h1 className="text-xl">Meals</h1>
          <div className="">
            <DietMeals dietMeals={dietState.diet_meals} />
          </div>
        </div>
      </div>
      {/* <div className="flex max-w-xl flex-col gap-2 rounded-md border p-2">
        <span className="text-3xl">Ingredients</span>
        <Ingredients ingredients={dietState.ingredients} />
        <IngredientsSelector />
      </div>
      <div className="flex max-w-xl flex-col gap-2 rounded-md border p-2">
        <div className="flex items-center gap-1">
          <span className="material-icons-outlined text-green-500">
            data_usage
          </span>
          <span className="text-2xl font-semibold">Nutrition Values</span>
        </div>
        {Object.keys(dietState.nutrients).length > 0 && (
          <IngredientsNutrition
            food={dietState}
            ingredients={dietState.ingredients}
          />
        )}
      </div> */}

      <div className="flex gap-2">
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
