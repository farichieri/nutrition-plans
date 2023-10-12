import { CheckButton } from "@/components/Buttons";
import { selectAuthSlice } from "@/features/authentication";
import { formatTwoDecimals } from "@/utils";
import {
  convertWater,
  getWaterInLts,
  getWaterUnit,
} from "@/utils/calculations";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateDietMutation } from "../../services";
import { toggleDrunkWater, updateWaterDrunkInDiet } from "../../slice";
import { Diet } from "../../types";

interface Props {
  diet: Diet;
  isEditing: boolean;
}

const Water: FC<Props> = ({ diet, isEditing }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { water } = diet;
  const [updateDiet] = useUpdateDietMutation();

  if (!user || !water) return <></>;

  const { littersDrunk, littersToDrink, drunk } = water;
  const { measurementUnit } = user;

  const handleCheck = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = !drunk;

    try {
      dispatch(toggleDrunkWater({ diet, value: value }));

      const dietUpdated: Diet = {
        ...diet,
        water: {
          ...water,
          drunk: value,
        },
      };
      const res = await updateDiet({ diet: dietUpdated, noDispatch: true });

      if ("error" in res) {
        dispatch(toggleDrunkWater({ diet, value: !value }));
      }
    } catch (error) {
      toast.error("Error saving water drunk.");
      console.error(error);
    } finally {
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = Number(event.target.value);
    const lts = getWaterInLts({ from: measurementUnit, value });
    dispatch(updateWaterDrunkInDiet({ diet, littersDrunk: lts }));
  };

  const realWaterToDrink = convertWater({
    to: measurementUnit,
    lts: littersToDrink,
  });

  const realWaterDrunk = convertWater({
    to: measurementUnit,
    lts: littersDrunk,
  });

  const waterUnit = getWaterUnit({ from: measurementUnit });
  const waterUnitCapitalized =
    waterUnit.charAt(0).toUpperCase() + waterUnit.slice(1);

  return (
    <div
      className={`flex items-center gap-1 rounded-xl border-b py-1 shadow-md dark:shadow-slate-500/20  ${
        drunk
          ? "bg-green-300 dark:bg-green-800"
          : "bg-white dark:bg-gray-500/20"
      }`}
    >
      <div className="flex w-full items-center justify-between px-2 ">
        <div className="flex items-baseline gap-1">
          <span className="min-w-fit font-semibold text-blue-500">
            💧Water:
          </span>
          <div className="flex items-baseline gap-1">
            <div>
              {isEditing ? (
                <input
                  type="number"
                  value={realWaterDrunk || ""}
                  onChange={handleChange}
                  className="h-10 w-20 rounded-md border-2 border-gray-300 text-center"
                  min={0}
                  step={0.1}
                />
              ) : (
                <span className="font-semibold text-green-500">
                  {formatTwoDecimals(realWaterDrunk)}
                </span>
              )}
            </div>
            <span>
              {waterUnitCapitalized} of {realWaterToDrink}{" "}
              {waterUnitCapitalized}
            </span>
          </div>
        </div>
        <div className="h-10 w-10">
          {!isEditing && <CheckButton onClick={handleCheck} checked={drunk} />}
        </div>
      </div>
    </div>
  );
};

export default Water;
