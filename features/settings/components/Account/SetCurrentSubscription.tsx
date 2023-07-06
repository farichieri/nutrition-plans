import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import { FC } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { SubscribeButton } from "@/components/Buttons";
import { useSelector } from "react-redux";

interface Props {}

const SetCurrentSubscription: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);

  return (
    <Box>
      <BoxMainContent>
        <div className="flex flex-col gap-5">
          <span className="text-3xl font-semibold">Your Subscription</span>
          <span>Current plan: {user?.subscriptionState}</span>
        </div>
      </BoxMainContent>
      <BoxBottomBar>
        <span className="text-sm opacity-50"></span>
        <div>
          <SubscribeButton />
        </div>
      </BoxBottomBar>
    </Box>
  );
};

export default SetCurrentSubscription;
