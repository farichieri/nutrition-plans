import {
  FoodGroup,
  CompatiblePlans,
  FoodType,
  Ingredient,
} from "@/types/foodTypes";
import { addMeal } from "@/firebase/helpers/Meal";
import { FC, useEffect, useState } from "react";
import { fetchFoodsByIDS } from "@/firebase/helpers/Food";
import { Meal, NewMeal } from "@/types/mealTypes";
import { selectAuthSlice } from "@/store/slices/authSlice";
import {
  selectCreateFoodSlice,
  setMealState,
} from "@/store/slices/createFoodSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Checkbox from "@/components/Form/Checkbox";
import FormAction from "@/components/Form/FormAction";
import Ingredients from "../../Recipe/Ingredients";
import IngredientsNutrition from "../../Ingredients/IngredientsNutrition";
import IngredientsSelector from "../../Ingredients/IngredientsSelector";
import Input from "@/components/Form/Input";

interface Props {}
const CreateMeal: FC<Props> = () => {
  const dispatch = useDispatch();
  const [isCreating, setIsCreating] = useState(false);
  const { mealState } = useSelector(selectCreateFoodSlice);
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.type;
    const name = event.target.name;
    const id = event.target.id;
    const value = event.target.value;
    const valueF = type === "number" ? Number(value) : value;
    if (name === "food_type") {
      let foodTypes = { ...mealState.food_type };
      let foodTypesUpdated = {
        ...foodTypes,
        [id]: !foodTypes[id as keyof FoodType],
      };
      dispatch(setMealState({ ...mealState, food_type: foodTypesUpdated }));
    } else if (name === "compatible_plans") {
      let foodTypes = { ...mealState.compatible_plans };
      let foodTypesUpdated = {
        ...foodTypes,
        [id]: !foodTypes[id as keyof CompatiblePlans],
      };
      dispatch(
        setMealState({ ...mealState, compatible_plans: foodTypesUpdated })
      );
    } else if (name === "nutrient") {
      let nutrients = { ...mealState.nutrients };
      let nutrientsUpdated = {
        ...nutrients,
        [id]: Number(valueF) > 0 ? Number(valueF) : 0,
      };
      dispatch(setMealState({ ...mealState, nutrients: nutrientsUpdated }));
    } else {
      dispatch(setMealState({ ...mealState, [id]: valueF }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    if (isCreating) return;
    setIsCreating(true);
    const newMeal: Meal = {
      ...mealState,
    };
    const res = await addMeal(newMeal, user);
    if (!res?.error && res?.food_id) {
      dispatch(setMealState(newMeal));
      alert("Recipe created successfully");
      router.push(`/app/food/${res.food_id}`);
    } else {
      alert("Error creating recipe");
    }
    setIsCreating(false);
  };

  const handleCancel = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setMealState(NewMeal));
  };

  // const fetchFoods = async (ingredients: Ingredient[]) => {
  //   const ids = ingredients.map((ing) => ing.food_id);
  //   const result = await fetchFoodsByIDS(ids);
  //   return result;
  // };

  // const [foodIngredients, setFoodIngredients] = useState<FoodGroup | null>(
  //   null
  // );

  // useEffect(() => {
  //   if (mealState.ingredients.length > 0) {
  //     const getFoods = async () => {
  //       const foods = await fetchFoods(mealState.ingredients);
  //       setFoodIngredients(foods);
  //     };
  //     getFoods();
  //   }
  // }, [mealState.ingredients.length]);

  return (
    <form
      className="mb-8 mt-8 flex max-w-xl flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <div>
        <span className="text-3xl font-semibold">Create Meal</span>
      </div>
      <div className="flex flex-col">
        <Input
          handleChange={handleChange}
          id={"meal_name"}
          isRequired={true}
          labelFor={"meal_name"}
          labelText={"Name"}
          name={"meal_name"}
          title={"Meal Name"}
          type={"text"}
          value={mealState["meal_name" as keyof Meal]}
        />
        <Input
          handleChange={handleChange}
          id={"meal_description"}
          isRequired={true}
          labelFor={"meal_description"}
          labelText={"Description"}
          name={"meal_description"}
          title={"Meal Description"}
          type={"text"}
          value={mealState["meal_description" as keyof Meal]}
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="">
          <h1 className="text-xl">Food Type</h1>
          <div className="">
            {Object.keys(mealState.food_type).map((type) => (
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
                value={mealState["food_type"][type as keyof FoodType]}
              />
            ))}
          </div>
        </div>
        <div className="">
          <h1 className="text-xl">Compatible plans</h1>
          <div className="">
            {Object.keys(mealState.compatible_plans).map((type) => (
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
                value={
                  mealState["compatible_plans"][type as keyof CompatiblePlans]
                }
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex max-w-xl flex-col gap-2 rounded-md border p-2">
        <span className="text-3xl">Foods</span>
        <Ingredients ingredients={mealState.foods} />
        <IngredientsSelector />
      </div>
      <div className="flex max-w-xl flex-col gap-2 rounded-md border p-2">
        <div className="flex items-center gap-1">
          <span className="material-icons-outlined text-green-500">
            data_usage
          </span>
          <span className="text-2xl font-semibold">Nutrition Values</span>
        </div>
        {/* {Object.keys(mealState.nutrients).length > 0 && (
          <IngredientsNutrition
            meal={mealState}
            foodIngredients={mealState.foods}
          />
        )} */}
      </div>
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
export default CreateMeal;
