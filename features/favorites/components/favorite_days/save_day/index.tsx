import { AiFillFileAdd } from "react-icons/ai";
import { Diet } from "@/features/plans";
import { FC, FormEvent, useState } from "react";
import { postLibraryDay } from "@/features/favorites/services";
import { selectAuthSlice } from "@/features/authentication";
import { TextArea } from "@/components";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import FormAction from "@/components/Form/FormAction";

interface Props {
  diet: Diet;
  handleClose: Function;
}

const SaveDay: FC<Props> = ({ diet, handleClose }) => {
  const { user } = useSelector(selectAuthSlice);
  const [input, setInput] = useState({
    name: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return <></>;

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const newDiet: Diet = {
        ...diet,
        name: input.name,
        description: input.description,
      };
      const res = await postLibraryDay({ diet: newDiet, user });
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
        <span className="text-xl font-semibold">Save Day as:</span>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <TextArea
            customClass="w-full border rounded-md"
            handleChange={handleChange}
            name="name"
            placeholder="Name..."
            readOnly={false}
            value={input.name}
            isRequired={true}
          />
          <TextArea
            customClass="w-full border rounded-md"
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
            action="submit"
            handleSubmit={handleSave}
            isLoading={isLoading}
            loadingMessage="Saving..."
            text="Save"
            type="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default SaveDay;
