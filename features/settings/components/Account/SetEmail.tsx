import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import { FC, useState } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { SubmitButton } from "@/components/Buttons";
import { useSelector } from "react-redux";

interface Props {}

const SetEmail: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = () => {};

  return (
    <Box>
      <BoxMainContent>
        <div className="flex flex-col gap-5">
          <span className="text-3xl font-semibold">Your Email</span>
          <span>Please enter your email</span>
          <div>
            <input
              className="cursor-default text-ellipsis rounded-md border bg-transparent px-2 py-2 outline-none "
              type="text"
              value={String(user?.email_address)}
              readOnly
            />
          </div>
        </div>
      </BoxMainContent>
      <BoxBottomBar>
        <span className="text-sm opacity-50">
          It is not possible to update your email for now
        </span>
        <div>
          <SubmitButton
            className={"h-9 w-16 text-sm"}
            onClick={handleSubmit}
            loadMessage={""}
            content="Save"
            isLoading={isLoading}
            isDisabled={isDisabled}
          />
        </div>
      </BoxBottomBar>
    </Box>
  );
};

export default SetEmail;
