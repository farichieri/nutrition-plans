import { CheckButton } from "@/components/Buttons";
import { FC, useEffect, useState } from "react";
import { FoodCategoriesEnum, FoodGroup } from "@/features/foods";
import { formatTwoDecimals } from "@/utils";
import { ShoppingListT, buildShoppingList } from "@/features/shopping";
import Collapsable from "@/components/Layout/Collapsable";
import Image from "next/image";

interface ListProps {
  list: ShoppingListT;
}

const ListColumn: FC<ListProps> = ({ list }) => {
  return (
    <>
      {Object.keys(list).map((category) => {
        const foodsLength = Object.values(list[category].foods).length;
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
                  {list[category].foods &&
                    Object.values(list[category].foods).map((food, index) => {
                      return (
                        <div key={`${food.id}_${index}`} className="flex gap-2">
                          <div className="">
                            <CheckButton onClick={() => {}} checked={false} />
                          </div>
                          <span className="relative h-[50px] min-h-[50px] w-[50px] min-w-[50px]">
                            <Image
                              src={food.imageURL}
                              alt={food.name!}
                              fill
                              className="rounded-md border object-cover"
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

interface Props {
  foods: FoodGroup;
}

type FoodCategoriesType = Partial<typeof FoodCategoriesEnum>;

const ShoppingList: FC<Props> = ({ foods }) => {
  const [list, setList] = useState<ShoppingListT>({});

  useEffect(() => {
    setList(buildShoppingList({ foods: { ...foods } }));
  }, [foods, setList, buildShoppingList]);

  return (
    <div className="flex flex-col gap-1">
      {Object.values(list).length > 1 && (
        <div className="grid w-full sm:grid-cols-fluid_lg sm:gap-5">
          <div className="flex w-full flex-col gap-1">
            {ListColumn({
              list: Object.fromEntries(Object.entries(list).slice(0, 9)),
            })}
          </div>
          <div className="flex w-full flex-col gap-1">
            {ListColumn({
              list: Object.fromEntries(Object.entries(list).slice(9)),
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
