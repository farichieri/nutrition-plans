import {
  selectPlansSlice,
  toggleEatenFood,
  removeFoodInDiet,
  updateFoodInDiet,
} from "@/features/plans/slice";
import { CheckButton } from "@/components/Buttons";
import { FC } from "react";
import { Food, getScaleOptions, orderScales } from "@/features/foods";
import { FoodKeys } from "@/types/initial";
import { formatTwoDecimals } from "@/utils";
import { getNewAmount } from "@/utils/nutritionHelpers";
import { MdDelete, MdDragHandle } from "react-icons/md";
import { updateDiet, Diet, getDietFoodToggled } from "@/features/plans";
import { useDispatch, useSelector } from "react-redux";
import FormSelect from "@/components/Form/FormSelect";
import Input from "@/components/Form/Input";
import NutritionInput from "@/components/Form/NutritionInput";
import RoundButton from "@/components/Buttons/RoundButton";
import BlurImage from "@/components/blur-image";

interface MealInCardProps {
  food: Food;
  isEditing: boolean;
}

const FoodInMealCard: FC<MealInCardProps> = ({ food, isEditing }) => {
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
      className={`flex w-full gap-1 ${food.isEaten ? "bg-green-500/20" : ""}`}
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
        <div className="flex h-full w-full flex-col py-1">
          <div className="flex w-full max-w-max flex-col ">
            <span className="text-base font-semibold capitalize leading-4 tracking-tight">
              {food.name}
            </span>
            {/* <span className="text-sm opacity-50">{food.description}</span> */}
          </div>
          <div className="flex h-full flex-col">
            <div className="mt-auto  flex w-full flex-wrap items-baseline gap-1">
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
                />
              ) : (
                <span className="text-sm">{scaleFormatted}</span>
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
                <span className="text-sm lowercase">
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
      </div>
    </div>
  );
};

export default FoodInMealCard;
