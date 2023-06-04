import {
  selectCreateDietSlice,
  setDietState,
} from "@/store/slices/createDietSlice";
import { DietMeal } from "@/features/plans";
import { FC } from "react";
import { Food, getScaleOptions, mergeScales } from "@/features/foods";
import { getNewAmount } from "../../../../utils/nutritionHelpers";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import Select from "@/components/Form/Select";
import Spinner from "@/components/Loader/Spinner";

interface IngredientProps {
  food: Food;
  dietMeal: DietMeal;
}

const DietMealFood: FC<IngredientProps> = ({ food, dietMeal }) => {
  const dispatch = useDispatch();
  const { dietState } = useSelector(selectCreateDietSlice);
  const scalesMerged = mergeScales(food);
  const options = getScaleOptions(scalesMerged);

  if (!dietState) return <>No State Provided</>;

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!dietMeal.diet_meal_id) return;
    let id = (event.target as HTMLButtonElement).id;
    let diet_meals = { ...dietState.diet_meals };
    let diet_meal_foods = { ...dietMeal.diet_meal_foods };
    delete diet_meal_foods[id];

    dispatch(
      setDietState({
        ...dietState,
        diet_meals: {
          ...diet_meals,
          [dietMeal.diet_meal_id]: {
            ...dietMeal,
            diet_meal_foods: diet_meal_foods,
          },
        },
      })
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!dietMeal.diet_meal_id) return;
    const type = event.target.type;
    const name = event.target.name;
    const id = event.target.id;
    const value = event.target.value;
    const valueF = type === "number" ? Number(value) : value;

    let diet_meals = { ...dietState.diet_meals };
    let diet_meal_foods = { ...dietMeal.diet_meal_foods };
    let food = { ...diet_meal_foods[id] };
    let foodUpdated = { ...food };

    if (name === "scale_name") {
      // Este tiene que pasar a (food, scale_amount)
      const newAmount = getNewAmount(
        scalesMerged,
        food.scale_name || "grams",
        value,
        food.scale_amount || 1
      );
      foodUpdated = {
        ...foodUpdated,
        scale_name: value,
        scale_amount: newAmount || food.food.serving_amount,
      };
    } else {
      foodUpdated = {
        ...foodUpdated,
        [name]: valueF,
      };
    }
    diet_meal_foods[id] = foodUpdated;
    dispatch(
      setDietState({
        ...dietState,
        diet_meals: {
          ...diet_meals,
          [dietMeal.diet_meal_id]: {
            ...dietMeal,
            diet_meal_foods: diet_meal_foods,
          },
        },
      })
    );
  };

  if (!food.food_id) {
    return (
      <div className="m-auto">
        <Spinner customClass="h-5 w-5" />
      </div>
    );
  }

  console.log({ options });

  return (
    <div className="flex items-center rounded-md border">
      <Image
        src={food.image}
        height={150}
        width={150}
        alt={food.food_name || ""}
        className="h-[100px] w-[100px] min-w-[100px] max-w-[100px] rounded-md object-cover"
      />
      <div className="flex w-full px-2">
        <div className="w-full">
          <div className="flex flex-col">
            <span className="text-base font-semibold capitalize">
              {food.food_name}
            </span>
            <span className="text-sm opacity-50">{food.food_description}</span>
          </div>

          <div className="flex flex-col">
            <div className="flex w-full items-center gap-2">
              <NutritionInput
                handleChange={handleChange}
                id={food.food_id}
                isRequired={false}
                key={"scale_amount"}
                labelFor={"scale_amount"}
                labelText={""}
                min={"0"}
                name={"scale_amount"}
                step={"1"}
                title={""}
                type={"number"}
                value={food.scale_amount}
              />
              <Select
                customClass={"h-full"}
                handleChange={handleChange}
                id={food.food_id}
                isRequired={false}
                labelFor={"scale_name"}
                labelText={""}
                name={"scale_name"}
                title={"Scale Name"}
                options={options}
                value={food.scale_name}
              />
            </div>
            <Input
              handleChange={handleChange}
              id={food.food_id}
              isRequired={false}
              labelFor={"text"}
              labelText={""}
              name={"text"}
              title={"Food Name"}
              type={"text"}
              value={food.text}
              placeholder="Aditional Note"
            />
          </div>
        </div>
        <button onClick={handleRemove} id={food.food_id} className="ml-auto">
          <span className="material-icons pointer-events-none w-6">
            delete_outlined
          </span>
        </button>
      </div>
    </div>
  );
};

interface Props {
  dietMeal: DietMeal;
}

const DietMealFoods: FC<Props> = ({ dietMeal }) => {
  const dietMealFoods = dietMeal.diet_meal_foods;

  if (Object.keys(dietMealFoods).length < 1) {
    return <>No Foods Added.</>;
  }

  return (
    <div className="flex flex-col gap-1">
      {Object.keys(dietMealFoods).map((food_id) => (
        <DietMealFood
          dietMeal={dietMeal}
          food={dietMealFoods[food_id]}
          key={food_id}
        />
      ))}
    </div>
  );
};

export default DietMealFoods;
