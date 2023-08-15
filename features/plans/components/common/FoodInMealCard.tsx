import {
  removeFoodInDiet,
  selectPlansSlice,
  toggleEatenFood,
  updateFoodInDiet,
} from "@/features/plans/slice";
import { CheckButton } from "@/components/Buttons";
import { FC } from "react";
import { Food, getScaleOptions, orderScales } from "@/features/foods";
import { FoodKeys } from "@/types/initial";
import { formatTwoDecimals } from "@/utils";
import { getDietFoodToggled } from "@/features/plans";
import { getNewAmount } from "@/utils/nutritionHelpers";
import { MdDelete, MdDragHandle } from "react-icons/md";
import { updateDiet } from "@/features/plans/services";
import { useDispatch, useSelector } from "react-redux";
import BlurImage from "@/components/blur-image";
import FormSelect from "@/components/Form/FormSelect";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import RoundButton from "@/components/Buttons/RoundButton";

interface MealInCardProps {
  food: Food;
  isEditing: boolean;
  isEditable: boolean;
}

const FoodInMealCard: FC<MealInCardProps> = ({
  food,
  isEditing,
  isEditable,
}) => {
  const dispatch = useDispatch();
  const scalesMerged = orderScales({ scales: food.scales });
  const options = getScaleOptions(scalesMerged);
  const { diets } = useSelector(selectPlansSlice);

  if (!food.id) return <></>;

  const handleRemove = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(removeFoodInDiet(food));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const scalesMerged = orderScales({ scales: food.scales });
    const type = event.target.type;
    const name = event.target.name;
    const value = event.target.value;
    const valueF = type === "number" ? Number(value) : value;

    let foodUpdated = { ...food };

    if (name === "scaleName") {
      const newAmount = getNewAmount({
        scales: scalesMerged,
        prev_scale_name: food.scaleName,
        new_scale_name: value,
        scaleAmount: food.scaleAmount,
      });
      foodUpdated = {
        ...food,
        scaleName: value,
        scaleAmount: newAmount || food.servingAmount,
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
    const { dietID, dietMealID, id } = food;
    if (!id || !dietID || !dietMealID) return;
    const diet = diets[dietID];
    const value = !food.isEaten;

    dispatch(toggleEatenFood({ food, value: value }));

    const dietUpdated = getDietFoodToggled({ diet, food, value: value });

    if (!dietUpdated) throw new Error("Error updating diet");

    const res = await updateDiet({ diet: dietUpdated });

    if (res.result === "error") {
      console.log(res.error);
      dispatch(toggleEatenFood({ food, value: !value }));
    }
  };

  const scaleFormatted = formatTwoDecimals(food.scaleAmount);
  return (
    <div
      className={`flex w-full gap-1 overflow-hidden ${
        food.isEaten ? "bg-green-300 dark:bg-green-800" : ""
      }`}
    >
      {isEditing && (
        <MdDragHandle className="m-auto h-6 w-6 min-w-fit opacity-50" />
      )}
      <span className="relative h-16 w-16 min-w-[64px] sm:h-16 sm:w-16">
        <BlurImage
          image={{ imageURL: food.imageURL, title: food.name!, id: food.id! }}
        />
      </span>
      <div className="flex h-auto w-full pr-2">
        <div className="flex h-full w-full flex-col justify-center gap-1 py-1">
          <div className="flex w-full max-w-max flex-col ">
            <span className="text-base font-medium capitalize leading-4 tracking-tight">
              {food.name}
            </span>
            {/* <span className="text-sm opacity-50">{food.description}</span> */}
          </div>
          <div className="flex h-full flex-col">
            <div className="mt-auto flex w-full items-center gap-1">
              {isEditing ? (
                <NutritionInput
                  handleChange={handleChange}
                  id={food.id}
                  labelText={""}
                  min={""}
                  name={String(FoodKeys.scaleAmount)}
                  step={"1"}
                  title={""}
                  type={"number"}
                  value={scaleFormatted}
                  readOnly={!isEditing}
                  customClass="!w-10"
                />
              ) : (
                <span className="text-xs opacity-70">{scaleFormatted}</span>
              )}
              {isEditing ? (
                <FormSelect
                  customClass={"h-full"}
                  handleChange={handleChange}
                  id={food.id}
                  labelText={""}
                  name={String(FoodKeys.scaleName)}
                  title={"Scale Name"}
                  options={options}
                  value={food.scaleName}
                  readOnly={!isEditing}
                />
              ) : (
                <span className="text-xs lowercase opacity-70">
                  {`${food.scaleName.toLowerCase()}${
                    scaleFormatted > 1 ? "" : ""
                  }`}
                </span>
              )}
            </div>
            {food.note && (
              <Input
                handleChange={handleChange}
                id={food.id}
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
        {isEditable && (
          <>
            {isEditing ? (
              <RoundButton
                customClass="w-10 h-10 p-1.5 my-auto ml-auto"
                onClick={handleRemove}
                id={food.id}
              >
                <MdDelete className="h-6 w-6" />
              </RoundButton>
            ) : (
              <CheckButton onClick={toggleDone} checked={food.isEaten} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FoodInMealCard;
