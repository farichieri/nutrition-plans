import { buildShoppingList } from "@/features/shopping";
import { FC } from "react";
import { FoodCategoriesEnum, FoodGroup } from "@/features/foods";
import Collapsable from "@/components/Layout/Collapsable";
import Image from "next/image";

interface Props {
  foods: FoodGroup;
}

type FoodCategoriesType = Partial<typeof FoodCategoriesEnum>;

const ShoppingList: FC<Props> = ({ foods }) => {
  const list = buildShoppingList({ foods });

  return (
    <div className="flex max-w-5xl flex-col gap-1">
      {list.map((item) => {
        const foodsLength = Object.values(item.foods).length;
        return (
          <div key={item.category}>
            <Collapsable
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
                    {
                      FoodCategoriesEnum[
                        item.category as keyof FoodCategoriesType
                      ]
                    }
                  </span>
                </div>
              }
              hidden={
                <div>
                  {item.foods &&
                    Object.values(item.foods).map((food, index) => {
                      return (
                        <div
                          key={`${food.food_id}_${index}`}
                          className="flex gap-2"
                        >
                          <span className="relative h-[50px] min-h-[50px] w-[50px] min-w-[50px]">
                            <Image
                              src={food.image}
                              alt={food.food_name!}
                              fill
                              className="rounded-md border object-cover"
                            />
                          </span>
                          <div className="flex flex-col">
                            <span>{food.food_name}</span>
                            <div className="flex gap-2">
                              <span>{food.scale_amount}</span>
                              <span>{food.scale_name}</span>
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
    </div>
  );
};

export default ShoppingList;
