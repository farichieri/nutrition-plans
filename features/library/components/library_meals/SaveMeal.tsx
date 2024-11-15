import { AiFillFileAdd } from "react-icons/ai";
import { DietMeal } from "@/features/plans";
import { FC, FormEvent, useState } from "react";
import { postLibraryMeal } from "@/features/library/services";
import { selectAuthSlice } from "@/features/authentication";
import { TextArea } from "@/components";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import FormAction from "@/components/Form/FormAction";

interface Props {
  meal: DietMeal;
  handleClose: Function;
}

const SaveMeal: FC<Props> = ({ meal, handleClose }) => {
  const { user } = useSelector(selectAuthSlice);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    nameSaved: "",
    description: "",
  });

  if (!user) return <></>;

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const newMeal: DietMeal = {
        ...meal,
        description: input.description,
        nameSaved: input.nameSaved,
      };
      const res = await postLibraryMeal({ meal: newMeal, user });
      if (res.result === "success") {
        toast.success("Day saved successfully.");
      }
      handleClose();
    } catch {
      console.log("Error saving day.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex w-xl max-w-[95vw] flex-col gap-5 px-5 py-5 ">
      <div className="flex items-center gap-1">
        <AiFillFileAdd className="h-5 w-5 text-green-500" />
        <span className="text-xl font-semibold">Save Meal as:</span>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <TextArea
            customClass="w-full border rounded-md p-2"
            handleChange={handleChange}
            name="nameSaved"
            placeholder="Name..."
            readOnly={false}
            value={input.nameSaved}
            isRequired={true}
          />
          <TextArea
            customClass="w-full border rounded-md p-2"
            handleChange={handleChange}
            name="description"
            placeholder="Description..."
            readOnly={false}
            value={input.description}
            isRequired={true}
          />
        </div>
        <div className="ml-auto flex">
          <FormAction
            type="Submit"
            action="submit"
            text="Save"
            isLoading={isLoading}
            handleSubmit={handleSave}
            loadingMessage="Saving..."
          />
        </div>
      </form>
    </div>
  );
};

export default SaveMeal;
