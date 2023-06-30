import { FC } from "react";
import { FoodCategoriesEnum } from "@/features/foods";
import Collapsable from "@/components/Layout/Collapsable";

interface Props {}

const ShoppingList: FC<Props> = () => {
  return (
    <div className="flex max-w-xl flex-col gap-1">
      {Object.values(FoodCategoriesEnum).map((category) => {
        return (
          <div key={category}>
            <Collapsable
              defaultState={false}
              showed={
                <div>
                  <span className="opacity-50">{category}</span>
                </div>
              }
              hidden={
                <div>
                  <span>Food 1</span>
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
