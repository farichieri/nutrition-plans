import {
  updateFoodInDiet,
  selectPlansSlice,
  removeFoodInDiet,
  toggleEatenFood,
  updateDiet,
  Diet,
} from "@/features/plans";
import { CheckButton } from "@/components/Buttons";
import { FC } from "react";
import { Food, getScaleOptions, mergeScales } from "@/features/foods";
import { FoodKeys } from "@/types/initialTypes";
import { getNewAmount } from "@/utils/nutritionHelpers";
import { MdDelete, MdDragHandle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import FormSelect from "@/components/Form/FormSelect";
import Image from "next/image";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import RoundButton from "@/components/Buttons/RoundButton";

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
    <div className="flex w-full gap-1">
      {isEditing && (
        <MdDragHandle className="m-auto h-6 w-6 min-w-fit opacity-50" />
      )}
      <span className="relative h-20 w-20 min-w-[80px] sm:h-20 sm:w-20">
        <Image
          src={food.image}
          fill
          className="object-cover "
          alt={food.food_name || ""}
        />
      </span>
      <div className="flex h-auto w-full">
        <div className="flex h-full w-full flex-col py-1">
          <div className="flex w-full max-w-max flex-col ">
            <span className="text-base font-semibold capitalize leading-5">
              {food.food_name}
            </span>
            {/* <span className="text-sm opacity-50">{food.food_description}</span> */}
          </div>
          <div className="flex h-full flex-col">
            <div className="mt-auto  flex w-full flex-wrap items-baseline gap-1">
              {isEditing ? (
                <NutritionInput
                  handleChange={handleChange}
                  id={food.food_id}
                  labelText={""}
                  min={""}
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
                    scaleFormatted > 1 ? "" : ""
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
            <MdDelete className="h-6 w-6" />
          </RoundButton>
        ) : (
          <CheckButton onClick={toggleDone} checked={food.eaten} />
        )}
      </div>
    </div>
  );
};

export default FoodInMealCard;
