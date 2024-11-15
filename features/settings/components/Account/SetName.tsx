import {
  selectAuthSlice,
  useUpdateUserMutation,
} from "@/features/authentication";
import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import { FC, FormEvent, useState } from "react";
import { SubmitButton } from "@/components/Buttons";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

interface Props {}

const SetName: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState(user?.displayName || "");
  const [updateUser] = useUpdateUserMutation();

  if (!user) return <></>;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const fields = { displayName: input };
      const res = await updateUser({ user, fields });
      if (!("error" in res)) {
        toast.success("Name updated successfully");
      } else {
        throw new Error("Error updating name");
      }
    } catch (error) {
      toast.error("Failed to update name");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <BoxMainContent>
          <div className="flex flex-col gap-5">
            <span className="text-3xl font-semibold">Your Name</span>
            <span>
              Please enter your full name, or a display name you are comfortable
              with.
            </span>
            <div>
              <input
                className="text-ellipsis rounded-md border bg-transparent px-2 py-2 outline-none "
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoCorrect="off"
                autoComplete="off"
                autoCapitalize="off"
              />
            </div>
          </div>
        </BoxMainContent>
        <BoxBottomBar>
          <span className="text-sm opacity-50"></span>{" "}
          <div>
            <SubmitButton
              className={"h-9 w-16 text-sm"}
              onClick={handleSubmit}
              loadMessage={""}
              content="Save"
              isLoading={isLoading}
              isDisabled={input === user.displayName || !input}
            />
          </div>
        </BoxBottomBar>
      </form>
    </Box>
  );
};

export default SetName;
