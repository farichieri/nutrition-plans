import ActionButton from "@/components/Buttons/ActionButton";
import { updateUser } from "@/firebase/helpers/Auth";
import { selectAuthSlice, setUpdateUser } from "@/store/slices/authSlice";
import { ButtonAction, MeasurementUnits } from "@/types/types";
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
  const userMU = user?.body_data.measurement_unit;
  const [MU, setMU] = useState(user?.body_data.measurement_unit);

  const handleSave = async () => {
    if (!user || !MU) return;
    const body_data = { ...user.body_data };
    const userUpdated = {
      ...user,
      body_data: {
        ...body_data,
        measurement_unit: MU,
      },
    };
    console.log({ userUpdated });
    setIsSaving(true);
    const res = await updateUser(userUpdated);
    if (!res?.error) {
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
    <div className="flex h-full flex-col gap-5">
      <span className="text-xl font-semibold underline">
        Measurement units:
      </span>
      <div className="flex flex-wrap gap-2">
        {Object.keys(MeasurementUnits).map((type) => (
          <button
            className={`rounded-md px-2 py-0.5 font-medium shadow-lg ${
              MU === type ? "bg-green-500" : "bg-slate-300"
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
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="mt-auto flex w-full items-center justify-center gap-2">
        <ActionButton
          loadMessage="Discarding..."
          content="Discard"
          isLoading={false}
          isDisabled={isDisabled}
          action={ButtonAction.discard}
          className="w-full"
          onClick={handleCancel}
        />
        <ActionButton
          loadMessage="Saving..."
          content="Save"
          isLoading={isSaving}
          isDisabled={isDisabled}
          action={ButtonAction.save}
          className="w-full"
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default General;
