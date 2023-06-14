import {
  updateFoodInDiet,
  selectPlansSlice,
  removeFoodInDiet,
  toggleEatenFood,
  updateDiet,
  Diet,
} from "@/features/plans";
import { FC } from "react";
import { Food, getScaleOptions, mergeScales } from "@/features/foods";
import { FoodKeys } from "@/types/initialTypes";
import { getNewAmount } from "@/utils/nutritionHelpers";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import RoundButton from "@/components/Buttons/RoundButton";
import FormSelect from "@/components/Form/FormSelect";
import { formatToFixed, round } from "@/utils";

interface MealInCardProps {
  food: Food;
  isEditing: boolean;
}

const FoodInMealCard: FC<MealInCardProps> = ({ food, isEditing }) => {
  const dispatch = useDispatch();
  const scalesMerged = mergeScales(food);
  const options = getScaleOptions(scalesMerged);
  const { diets } = useSelector(selectPlansSlice);

  if (!food.food_id) return <></>;

  const handleRemove = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(removeFoodInDiet(food));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const scalesMerged = mergeScales(food);
    const type = event.target.type;
    const name = event.target.name;
    const value = event.target.value;
    const valueF = type === "number" ? Number(value) : value;

    let foodUpdated = { ...food };

    if (name === "scale_name") {
      const newAmount = getNewAmount(
        scalesMerged,
        food.scale_name,
        value,
        food.scale_amount
      );
      foodUpdated = {
        ...food,
        scale_name: value,
        scale_amount: newAmount || food.serving_amount,
      };
    } else {
      foodUpdated = {
        ...food,
        [name]: valueF,
      };
    }
    dispatch(updateFoodInDiet(foodUpdated));
  };

  const toggleDone = async (event: React.MouseEvent) => {
    event.preventDefault();
    const { diet_id, diet_meal_id, food_id } = food;
    if (!food_id || !diet_id || !diet_meal_id) return;
    const diet = diets[diet_id];
    const value = !food.eaten;

    dispatch(toggleEatenFood({ food, value: value }));

    const dietUpdated: Diet = {
      ...diet,
      diet_meals: {
        ...diet.diet_meals,
        [diet_meal_id]: {
          ...diet.diet_meals[diet_meal_id],
          diet_meal_foods: {
            ...diet.diet_meals[diet_meal_id].diet_meal_foods,
            [food_id]: {
              ...diet.diet_meals[diet_meal_id].diet_meal_foods[food_id],
              eaten: value,
            },
          },
        },
      },
    };
    const res = await updateDiet({ diet: dietUpdated });

    if (res.result === "error") {
      dispatch(toggleEatenFood({ food, value: !value }));
    }
  };

  const scaleFormatted = Math.round(food.scale_amount * 100) / 100;

  return (
    <div className="flex w-full gap-2">
      <span className="relative h-24 w-24 min-w-[96px]  sm:h-24 sm:w-24">
        <Image
          src={food.image}
          fill
          className="object-cover "
          alt={food.food_name || ""}
        />
      </span>
      <div className="flex h-auto w-full">
        <div className="flex h-full w-full flex-col">
          <div className="flex w-full max-w-max flex-col ">
            <span className="text-base font-semibold capitalize">
              {food.food_name}
            </span>
            <span className="text-sm opacity-50">{food.food_description}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex w-full flex-wrap items-baseline gap-2">
              {isEditing ? (
                <NutritionInput
                  handleChange={handleChange}
                  id={food.food_id}
                  labelText={""}
                  min={"0"}
                  name={String(FoodKeys.scale_amount)}
                  step={"1"}
                  title={""}
                  type={"number"}
                  value={scaleFormatted}
                  readOnly={!isEditing}
                />
              ) : (
                <span>{scaleFormatted}</span>
              )}
              {isEditing ? (
                <FormSelect
                  customClass={"h-full"}
                  handleChange={handleChange}
                  id={food.food_id}
                  labelText={""}
                  name={String(FoodKeys.scale_name)}
                  title={"Scale Name"}
                  options={options}
                  value={food.scale_name}
                  readOnly={!isEditing}
                />
              ) : (
                <span className="text-sm capitalize">
                  {`${food.scale_name.toLowerCase()}${
                    scaleFormatted > 1 ? "s" : ""
                  }`}
                </span>
              )}
            </div>
            {food.note && (
              <Input
                handleChange={handleChange}
                id={food.food_id}
                isRequired={false}
                labelFor={FoodKeys.note}
                labelText={""}
                name={FoodKeys.note}
                title={"Food Note"}
                type={FoodKeys.note}
                value={food.note}
                placeholder="Aditional Note"
                readOnly={!isEditing}
              />
            )}
          </div>
        </div>
        {isEditing ? (
          <RoundButton
            customClass="w-10 h-10 p-1.5 my-auto ml-auto"
            onClick={handleRemove}
            id={food.food_id}
          >
            <span className="material-icons pointer-events-none">delete</span>
          </RoundButton>
        ) : (
          <RoundButton
            customClass="w-10 h-10 p-1.5 my-auto ml-auto "
            onClick={toggleDone}
          >
            {food.eaten ? (
              <span className="material-icons text-green-500">
                check_circle
              </span>
            ) : (
              <span className="material-icons">radio_button_unchecked</span>
            )}
          </RoundButton>
        )}
      </div>
    </div>
  );
};

export default FoodInMealCard;
