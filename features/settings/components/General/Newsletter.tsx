import {
  selectAuthSlice,
  setUpdateUser,
  updateUser,
} from "@/features/authentication";
import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import { FC, useState } from "react";
import { NewsletterChoices } from "@/types";
import { SubmitButton } from "@/components/Buttons";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface Props {}

const Newsletter: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [isLoading, setIsLoading] = useState(false);
  const [userChoice, setUserChoice] = useState<NewsletterChoices>(
    user?.newsletter || NewsletterChoices.yes
  );

  if (!user) return <></>;

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const userUpdated = {
        ...user,
        Newsletter: userChoice,
      };
      const res = await updateUser(userUpdated);
      if (res.result === "success") {
        dispatch(setUpdateUser(userUpdated));
        toast.success("Newsletter choice updated");
      } else {
        throw Error;
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Error updating my newsletter choice");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <BoxMainContent>
        <div className="flex flex-col items-start gap-5">
          <span className="text-3xl font-semibold">Newsletter</span>
          <div className="flex flex-col gap-1">
            {Object.values(NewsletterChoices).map((choice) => {
              return (
                <div
                  key={choice}
                  className="flex items-center justify-between gap-5"
                >
                  <label htmlFor={choice} className="cursor-pointer capitalize">
                    {choice}
                  </label>
                  <input
                    className="cursor-pointer accent-green-500"
                    type="checkbox"
                    id={choice}
                    name="choice"
                    value={choice}
                    checked={userChoice === choice}
                    onChange={() => {
                      setUserChoice(choice);
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
          Select Yes if you want to receive our newsletter in your email
        </span>
        <SubmitButton
          className={"ml-auto h-9 w-16 text-sm"}
          onClick={handleSubmit}
          loadMessage={""}
          content="Save"
          isLoading={isLoading}
          isDisabled={userChoice === user.newsletter}
        />
      </BoxBottomBar>
    </Box>
  );
};

export default Newsletter;
