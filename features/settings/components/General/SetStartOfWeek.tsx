import {
  selectAuthSlice,
  setUpdateUser,
  updateUser,
} from "@/features/authentication";
import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import { FC, useState } from "react";
import { StartsOfWeek } from "@/types";
import { SubmitButton } from "@/components/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

interface Props {}

const SetStartOfWeek: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [isLoading, setIsLoading] = useState(false);
  const [weekSelected, setWeekSelected] = useState<StartsOfWeek>(
    user?.startOfWeek || StartsOfWeek.sunday
  );

  if (!user) return <></>;

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const userUpdated = {
        ...user,
        startOfWeek: weekSelected,
      };
      const res = await updateUser(userUpdated);
      if (res.result === "success") {
        dispatch(setUpdateUser(userUpdated));
        toast.success("Start of week updated");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error updating start of week");
    }
  };

  return (
    <Box>
      <BoxMainContent>
        <div className="flex flex-col items-start gap-5">
          <span className="text-3xl font-semibold">Start Of Week</span>
          <div className="flex flex-col justify-start gap-1">
            {Object.values(StartsOfWeek).map((startOfWeek) => {
              return (
                <div
                  key={startOfWeek}
                  className="flex items-center justify-between gap-5"
                >
                  <label
                    htmlFor={startOfWeek}
                    className="cursor-pointer capitalize"
                  >
                    {startOfWeek}
                  </label>
                  <input
                    className="cursor-pointer accent-green-500"
                    type="checkbox"
                    id={startOfWeek}
                    name="startOfWeek"
                    value={startOfWeek}
                    checked={weekSelected === startOfWeek}
                    onChange={() => {
                      setWeekSelected(startOfWeek);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </BoxMainContent>
      <BoxBottomBar>
        <span className="text-sm opacity-50">
          Choose your preferred Start Of Week
        </span>
        <SubmitButton
          className={"ml-auto h-9 w-16 text-sm"}
          onClick={handleSubmit}
          loadMessage={""}
          content="Save"
          isLoading={isLoading}
          isDisabled={weekSelected === user?.startOfWeek}
        />
      </BoxBottomBar>
    </Box>
  );
};

export default SetStartOfWeek;
