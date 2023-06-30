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
  const { diet_water } = diet;

  if (!user || !diet_water) return <></>;

  const { litters_drunk, litters_to_drink, drunk } = diet_water;
  const { measurement_unit } = user;

  const handleCheck = async (event: React.MouseEvent) => {
    event.preventDefault();
    const value = !drunk;

    dispatch(toggleDrunkWater({ diet, value: value }));

    const dietUpdated: Diet = {
      ...diet,
      diet_water: {
        ...diet_water,
        drunk: value,
      },
    };
    const res = await updateDiet({ diet: dietUpdated });

    if (res.result === "error") {
      dispatch(toggleDrunkWater({ diet, value: !value }));
    }
  };

  const water = convertWater({ to: measurement_unit, lts: litters_to_drink });
  const waterUnit = getWaterUnit({ from: measurement_unit });

  return (
    <div
      className={`flex items-center gap-1 rounded-xl border-b  ${
        drunk ? "border-blue-300 bg-blue-300/30 " : "bg-gray-500/20"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <div>
          <span className="px-2 font-semibold">Water:</span>
          <span>
            {water} {waterUnit}
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
