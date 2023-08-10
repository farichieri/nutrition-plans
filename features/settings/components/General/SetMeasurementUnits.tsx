import {
  selectAuthSlice,
  setUpdateUser,
} from "@/features/authentication/slice";
import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import { FC, useEffect, useState } from "react";
import { MeasurementUnits } from "@/types";
import { SubmitButton } from "@/components/Buttons";
import { toast } from "react-hot-toast";
import { updateUser } from "@/features/authentication/services";
import { useDispatch, useSelector } from "react-redux";

interface Props {}

const SetMeasurementUnits: FC<Props> = () => {
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useSelector(selectAuthSlice);
  const userMU = user?.measurementUnit;
  const [MU, setMU] = useState(user?.measurementUnit);

  const handleSave = async () => {
    if (!user || !MU) return;
    try {
      setIsSaving(true);
      const fields = { measurementUnit: MU };
      const res = await updateUser({ user, fields });
      if (res.result === "success") {
        dispatch(setUpdateUser({ user, fields }));
        toast.success("Measurement units updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update measurement units");
    } finally {
      setIsSaving(false);
    }
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
                    ? "border-green-500 bg-green-500/50 shadow-inner"
                    : " bg-slate-300/20 "
                }`}
                key={type}
                value={type}
                onClick={() => setMU(type)}
              >
                <span className="text-xl font-semibold capitalize">{type}</span>
                {type === "metric" ? (
                  <div className="flex w-32 flex-col">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm opacity-70">Height:</span>
                      <span>cm</span>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm opacity-70">Weight:</span>
                      <span>kg</span>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm opacity-70">Water:</span>
                      <span>lts</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-32 flex-col">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm opacity-70">Height:</span>
                      <span>in & ft</span>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm opacity-70">Weight:</span>
                      <span>lbs</span>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm opacity-70">Water:</span>
                      <span>fl oz</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </BoxMainContent>

      <BoxBottomBar>
        <span className="text-sm opacity-50">
          Choose your preferred Measurement Units
        </span>
        <div className="ml-auto flex items-center justify-center gap-2">
          <SubmitButton
            className={"h-9 w-16 text-sm"}
            onClick={handleSave}
            loadMessage={""}
            content="Save"
            isLoading={isSaving}
            isDisabled={isDisabled}
          />
        </div>
      </BoxBottomBar>
    </Box>
  );
};

export default SetMeasurementUnits;
