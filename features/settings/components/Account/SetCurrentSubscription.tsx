import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import { FC } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { SubscribeButton } from "@/components/Buttons";
import { useSelector } from "react-redux";

interface Props {}

const SetCurrentSubscription: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);

  if (!user) return <></>;

  return (
    <Box>
      <BoxMainContent>
        <div className="flex flex-col gap-5">
          <span className="text-3xl font-semibold">Your Subscription</span>
          <div className="flex items-center gap-1">
            <span>Current plan:</span>
            {user.isPremium ? (
              <span className="rounded-md bg-green-500 p-1 capitalize">
                Premium
              </span>
            ) : (
              <span className="rounded-md bg-slate-300/50 p-1 capitalize">
                Free
              </span>
            )}
          </div>
        </div>
      </BoxMainContent>
      <BoxBottomBar>
        {!user.isPremium && (
          <>
            <span className="text-sm opacity-50"></span>
            <div>
              <SubscribeButton />
            </div>
          </>
        )}
      </BoxBottomBar>
    </Box>
  );
};

export default SetCurrentSubscription;
