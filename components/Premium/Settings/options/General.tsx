import ActionButton from "@/components/Buttons/ActionButton";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { ButtonAction } from "@/types/types";
import { FC, useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  setSettingSelected: Function;
}

const General: FC<Props> = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useSelector(selectAuthSlice);

  const handleSave = () => {};

  return (
    <div className="flex h-full flex-col">
      <span>Measurement units:</span>
      <div className="flex flex-col">
        <span>Weight</span>
        <div>
          <button>Lbs</button>
          <button>Kgs</button>
        </div>
      </div>
      <div className="flex flex-col">
        <span>Height</span>
        <div>
          <button>Cms</button>
          <button>Feet Inches</button>
        </div>
      </div>
      <div className="mt-auto flex w-full items-center justify-center gap-2">
        <ActionButton
          loadMessage="Discarding..."
          content="Discard"
          isLoading={false}
          isDisabled={false}
          action={ButtonAction.delete}
          className="w-full"
          onClick={() => {}}
        />
        <ActionButton
          loadMessage="Saving..."
          content="Save"
          isLoading={isSaving}
          isDisabled={false}
          action={ButtonAction.save}
          className="w-full"
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default General;
