import { FC } from "react";
import { Diet } from "../../types";
import { CheckButton } from "@/components/Buttons";
import { updateDiet } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrunkWater } from "../../slice";
import { selectAuthSlice } from "@/features/authentication";
import { convertWater, getWaterUnit } from "@/utils/calculations";

interface Props {
  diet: Diet;
  isEditing: boolean;
}

const Water: FC<Props> = ({ diet, isEditing }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { water } = diet;

  if (!user || !water) return <></>;

  const { littersDrunk, littersToDrink, drunk } = water;
  const { measurementUnit } = user;

  const handleCheck = async (event: React.MouseEvent) => {
    event.preventDefault();
    const value = !drunk;

    dispatch(toggleDrunkWater({ diet, value: value }));

    const dietUpdated: Diet = {
      ...diet,
      water: {
        ...water,
        drunk: value,
      },
    };
    const res = await updateDiet({ diet: dietUpdated });

    if (res.result === "error") {
      dispatch(toggleDrunkWater({ diet, value: !value }));
    }
  };

  const realWater = convertWater({
    to: measurementUnit,
    lts: littersToDrink,
  });
  const waterUnit = getWaterUnit({ from: measurementUnit });

  return (
    <div
      className={`flex items-center gap-1 rounded-xl border-b  ${
        drunk
          ? "border-blue-300 bg-blue-300/30 "
          : "bg-white dark:bg-gray-500/20"
      }`}
    >
      <div className="flex w-full items-center justify-between pr-2">
        <div>
          <span className="px-2 font-semibold">Water:</span>
          <span>
            {realWater} {waterUnit}
          </span>
        </div>
        <div className="h-10 w-10">
          {!isEditing && <CheckButton onClick={handleCheck} checked={drunk} />}
        </div>
      </div>
    </div>
  );
};

export default Water;
