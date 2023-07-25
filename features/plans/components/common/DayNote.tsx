import { Diet } from "../..";
import { setDietNote } from "../../slice";
import { useDispatch } from "react-redux";
import React, { FC } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

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

  return (
    <div className="w-full">
      {(isEditing || diet.note) && (
        <ReactTextareaAutosize
          minRows={1}
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          name="text"
          spellCheck={false}
          onChange={handleChange}
          value={diet.note || ""}
          placeholder="Note..."
          readOnly={!isEditing}
          className={`text-md w-full resize-none overflow-hidden bg-transparent p-2 ${
            isEditing
              ? "rounded-md border"
              : "cursor-default select-none border-b outline-none"
          }`}
        />
      )}
    </div>
  );
};

export default DayNote;
