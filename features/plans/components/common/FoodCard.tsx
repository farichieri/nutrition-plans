import { FC, MouseEventHandler } from "react";
import { Food, getDefaultScale } from "@/features/foods";
import { selectPlansSlice, setIsEditingDiet } from "../../slice";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import RoundButton from "@/components/Buttons/RoundButton";

interface MealInCardProps {
  food: Food;
  handleRemove: MouseEventHandler;
}

const FoodInMealCard: FC<MealInCardProps> = ({ food, handleRemove }) => {
  const { isEditingDiet } = useSelector(selectPlansSlice);
  const { scale_name, scale_amount, scale_grams } = getDefaultScale(
    food.scales
  );

  if (!food.food_id) return <></>;

  return (
    <Link
      key={food.food_id}
      className="flex w-full"
      href={`/app/food/${food.food_id}?amount=${scale_amount}&scale=${scale_name}`}
    >
      <Image
        src={food.image}
        height={150}
        width={150}
        alt={food.food_name || ""}
        className="h-[130px] w-[130px] min-w-[130px] max-w-[130px] object-cover"
      />
      <div className="flex w-full p-2">
        <div className="flex w-full flex-col">
          <div className="">
            <span>{food.food_name}</span>
          </div>
          <div className="">
            <span className="text-xs opacity-50">{food.food_description}</span>
          </div>
          <div className="flex gap-1 text-xs">
            <span>{scale_amount}</span>
            <span className="capitalize">{scale_name}</span>
            <span className="ml-5 text-xs opacity-50">
              {`(${scale_grams} grams)`}
            </span>
          </div>
          {/* <div className="flex w-full flex-col text-left text-xs">
            <span className="text-blue-500">
              Food Complexity: {food.complexity}
            </span>
            <span className="text-cyan-500">
              Meal Cook: {String(food.cook_time > 0)}
            </span>
            <span className="text-yellow-500">
              Food Time: {food.prep_time + food.cook_time}
            </span>
          </div> */}
        </div>

        {isEditingDiet ? (
          <RoundButton
            customClass="w-10 h-10 p-1.5 my-auto ml-auto"
            onClick={handleRemove}
            id={food.food_id}
          >
            <span className="material-icons pointer-events-none">delete</span>
          </RoundButton>
        ) : (
          <div className="my-auto flex">
            <div>
              {/* Eaten */}
              <span className="material-icons md-20">
                radio_button_unchecked
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default FoodInMealCard;
