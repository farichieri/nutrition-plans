import { FC } from "react";

interface Props {
  foodID: string;
}

const FoodActions: FC<Props> = ({ foodID }) => {
  return (
    <div className="flex justify-between">
      <span>Like</span>
      <span>Fav</span>
      <span>Block</span>
    </div>
  );
};

export default FoodActions;
