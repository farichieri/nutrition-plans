import {
  selectAuthSlice,
  setUpdateUser,
} from "@/features/authentication/slice";
import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import { ButtonType, MeasurementUnits } from "@/types";
import { FC, useEffect, useState } from "react";
import { updateUser } from "@/features/authentication/services";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "@/components/Buttons/ActionButton";

interface Props {}

const SetMeasurementUnits: FC<Props> = () => {
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useSelector(selectAuthSlice);
  const userMU = user?.measurement_unit;
  const [MU, setMU] = useState(user?.measurement_unit);

  const handleSave = async () => {
    if (!user || !MU) return;
    const userUpdated = {
      ...user,
      measurement_unit: MU,
    };
    setIsSaving(true);
    const res = await updateUser(userUpdated);
    if (res.result === "success") {
      dispatch(setUpdateUser(userUpdated));
    }
    setIsSaving(false);
  };

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    setMU(userMU);
  };

  useEffect(() => {
    if (JSON.stringify(MU) === JSON.stringify(userMU)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [user, MU]);

  return (
    <Box>
      <BoxMainContent>
        <div className="flex flex-col gap-5">
          <span className="text-3xl font-semibold">Measurement Units</span>

          <div className="flex flex-wrap gap-2">
            {Object.values(MeasurementUnits).map((type) => (
              <button
                className={`rounded-md border px-2 py-0.5 font-medium shadow-lg ${
                  MU === type
                    ? "border-green-500 bg-green-500/50 text-white shadow-inner"
                    : "border-slate-400 bg-slate-300/50 text-black"
                }`}
                key={type}
                value={type}
                onClick={() => setMU(type)}
              >
                <span className="text-xl font-semibold capitalize">{type}</span>
                {type === MeasurementUnits.metric ? (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-sm">Height:</span>
                      <span>Centimeter - cm</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">Weight:</span>
                      <span>Kilograms - kg</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">Water:</span>
                      <span>Liters - lts</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-sm">Height:</span>
                      <span>Inches and feets</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">Weight:</span>
                      <span>Pounds - lbs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">Water:</span>
                      <span>Fluid Onces - fl oz</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </BoxMainContent>

      <BoxBottomBar>
        <div className="ml-auto flex items-center justify-center gap-2">
          <ActionButton
            loadMessage="Saving..."
            content="Save"
            isLoading={isSaving}
            isDisabled={isDisabled}
            type={ButtonType.save}
            className="w-full"
            onClick={handleSave}
            action="submit"
          />
        </div>
      </BoxBottomBar>
    </Box>
  );
};

export default SetMeasurementUnits;
