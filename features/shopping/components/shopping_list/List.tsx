import { CheckButton } from "@/components/Buttons";
import { FC } from "react";
import { FoodCategories } from "@/features/foods";
import { formatTwoDecimals } from "@/utils";
import { ShoppingListFood, ShoppingListT } from "@/features/shopping";
import BlurImage from "@/components/blur-image";

interface Props {
  list: ShoppingListT;
  selecteds: string[];
  handleSelected: ({ food }: { food: ShoppingListFood }) => void;
}
type FoodCategoriesType = Partial<typeof FoodCategories>;

const List: FC<Props> = ({ list, handleSelected, selecteds }) => {
  return (
    <div className="flex flex-col divide-y divide-gray-500/20">
      {Object.keys(list).map((category) => {
        const foodsLength = Object.values(list[category]).length;
        return (
          <div key={category} className="py-2">
            <div className="flex gap-2">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-sm font-semibold ${
                  foodsLength > 0 ? "" : "bg-transparent"
                }`}
              >
                {"-"}
              </span>

              <span className="opacity-50">
                {FoodCategories[category as keyof FoodCategoriesType]}
              </span>
            </div>
            <div>
              {list[category] &&
                Object.values(list[category]).map((food, index) => {
                  const isSelected = selecteds.includes(food.id);
                  return (
                    <div
                      key={`${food.id}_${index}`}
                      className={`flex items-center gap-1 rounded-lg px-1 py-2 ${
                        isSelected ? "bg-slate-500/20" : "bg-transparent"
                      } `}
                    >
                      <div className="">
                        <CheckButton
                          onClick={() => handleSelected({ food })}
                          checked={isSelected}
                        />
                      </div>
                      <span className="relative h-[50px] min-h-[50px] w-[50px] min-w-[50px] overflow-auto rounded-md">
                        <BlurImage
                          src={food.imageURL}
                          alt={food.name}
                          width={200}
                          height={200}
                        />
                      </span>
                      <div className="flex flex-col">
                        <span>{food.name}</span>
                        <div className="flex gap-2">
                          <span>{formatTwoDecimals(food.scaleAmount)}</span>
                          <span>{food.scaleName}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
