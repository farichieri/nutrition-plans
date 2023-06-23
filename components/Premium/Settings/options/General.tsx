import {
  selectAuthSlice,
  setUpdateUser,
} from "@/features/authentication/slice";
import ActionButton from "@/components/Buttons/ActionButton";
import { updateUser } from "@/features/authentication/services";
import { ButtonType, MeasurementUnits } from "@/types";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  setSettingSelected: Function;
}

const General: FC<Props> = () => {
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
    <section className="flex h-full flex-col gap-5 overflow-hidden">
      <div className="flex h-full flex-col gap-5 overflow-auto p-3">
        <span className="text-md font-semibold  underline md:text-xl">
          Measurement units:
        </span>
        <div className="flex flex-wrap gap-2">
          {Object.values(MeasurementUnits).map((type) => (
            <button
              className={`rounded-md border px-2 py-0.5 font-medium shadow-lg ${
                MU === type
                  ? "border-green-500 bg-green-500/70 text-white shadow-inner"
                  : "border-slate-400 bg-slate-300/50 text-black"
              }`}
              key={type}
              value={type}
              onClick={() => setMU(type)}
            >
              <span className="text-xl font-semibold capitalize">{type}</span>
              {type === MeasurementUnits.metric ? (
                <div className="flex flex-col">
                  <div className="flex gap-1">
                    <span>Height:</span>
                    <span>Centimeter - cm</span>
                  </div>
                  <div className="flex gap-1">
                    <span>Weight:</span>
                    <span>Kilograms - kg</span>
                  </div>
                  <div className="flex gap-1">
                    <span>Water:</span>
                    <span>Liters - lts</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="flex gap-1">
                    <span>Height:</span>
                    <span>Inches and feets</span>
                  </div>
                  <div className="flex gap-1">
                    <span>Weight:</span>
                    <span>Pounds - lbs</span>
                  </div>
                  <div className="flex gap-1">
                    <span>Water:</span>
                    <span>Fluid Onces - fl oz</span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto flex w-full items-center justify-center gap-2 border-t p-3">
        <ActionButton
          loadMessage="Discarding..."
          content="Discard"
          isLoading={false}
          isDisabled={isDisabled}
          type={ButtonType.discard}
          className="w-full"
          onClick={handleCancel}
          action="submit"
        />
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
    </section>
  );
};

export default General;
