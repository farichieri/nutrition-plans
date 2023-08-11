import { Diet } from "../..";
import { setDietNote } from "../../slice";
import { TextArea } from "@/components";
import { useDispatch } from "react-redux";
import React, { FC } from "react";

interface Props {
  isEditing: boolean;
  diet: Diet;
}

const DayNote: FC<Props> = ({ isEditing, diet }) => {
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    dispatch(setDietNote({ diet: diet, note: value }));
  };

  const customClass = isEditing
    ? "rounded-md border p-2 text-sm text-gray-600 dark:text-gray-300 bg-green-100 dark:bg-green-900/10"
    : "cursor-default bg-green-100 dark:bg-green-900/10 text-gray-600 dark:text-gray-300 text-sm p-2 select-none rounded-md border border-green-500/50 bg-green-500/10 outline-none";

  return (
    <>
      {(isEditing || diet.note) && (
        <div className="w-full">
          <TextArea
            handleChange={handleChange}
            value={diet.note || ""}
            placeholder="Note..."
            readOnly={!isEditing}
            customClass={customClass}
            name="note"
            isRequired={false}
          />
        </div>
      )}
    </>
  );
};

export default DayNote;
