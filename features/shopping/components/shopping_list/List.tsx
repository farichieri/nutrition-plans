import { CheckButton } from "@/components/Buttons";
import { FC } from "react";
import { FoodCategoriesEnum } from "@/features/foods";
import { formatTwoDecimals } from "@/utils";
import { ShoppingListFood, ShoppingListT } from "@/features/shopping";
import Collapsable from "@/components/Layout/Collapsable";
import Image from "next/image";
import BlurImage from "@/components/BlurImage";

interface Props {
  list: ShoppingListT;
  selecteds: string[];
  handleSelected: ({ food }: { food: ShoppingListFood }) => void;
}
type FoodCategoriesType = Partial<typeof FoodCategoriesEnum>;

const List: FC<Props> = ({ list, handleSelected, selecteds }) => {
  return (
    <>
      {Object.keys(list).map((category) => {
        const foodsLength = Object.values(list[category]).length;
        return (
          <div key={category}>
            <Collapsable
              key={category}
              defaultState={foodsLength > 0 ? true : false}
              showed={
                <div className="flex gap-2">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-sm font-semibold ${
                      foodsLength > 0 ? "bg-red-500/80" : "bg-transparent"
                    }`}
                  >
                    {foodsLength > 0 ? foodsLength : "-"}
                  </span>

                  <span className="opacity-50">
                    {FoodCategoriesEnum[category as keyof FoodCategoriesType]}
                  </span>
                </div>
              }
              hidden={
                <div>
                  {list[category] &&
                    Object.values(list[category]).map((food, index) => {
                      const isSelected = selecteds.includes(food.id);
                      return (
                        <div key={`${food.id}_${index}`} className="flex gap-2">
                          <div className="">
                            <CheckButton
                              onClick={() => handleSelected({ food })}
                              checked={isSelected}
                            />
                          </div>
                          <span className="relative h-[50px] min-h-[50px] w-[50px] min-w-[50px] overflow-auto rounded-md">
                            <BlurImage
                              image={{
                                imageURL: food.imageURL,
                                title: food.name!,
                                id: food.id!,
                              }}
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
              }
            />
          </div>
        );
      })}
    </>
  );
};

export default List;
