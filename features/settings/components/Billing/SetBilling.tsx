import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import { FC, useState } from "react";
import { selectAuthSlice } from "@/features/authentication/slice";
import { useDispatch, useSelector } from "react-redux";
import { sendCustomerToPortal } from "@/features/stripe";
import Spinner from "@/components/Loader/Spinner";
import { SubscribeButton } from "@/components/Buttons";

interface Props {}

const SetBilling: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const [isLoading, setIsLoading] = useState({
    redirectManage: false,
  });

  if (!user) return <></>;

  const handleManageSubscription = () => {
    if (isLoading.redirectManage) return;
    try {
      setIsLoading({ ...isLoading, redirectManage: true });
      sendCustomerToPortal();
    } catch (error) {
      console.log(error);
      setIsLoading({ ...isLoading, redirectManage: false });
    }
  };

  return (
    <Box>
      <BoxMainContent>
        <div className="flex flex-col gap-5">
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
          {!user.isPremium && (
            <div className="flex">
              <div className="flex flex-col">
                <span>Unlock all benefits, from $12/month</span>
              </div>
            </div>
          )}
        </div>
      </BoxMainContent>

      <BoxBottomBar>
        {!user.isPremium ? (
          <div className="ml-auto">
            <SubscribeButton />
          </div>
        ) : (
          <button
            className="ml-auto flex items-center gap-1 rounded-3xl bg-blue-500 px-3 py-1.5"
            onClick={handleManageSubscription}
          >
            Manage Subscription
            {isLoading.redirectManage && <Spinner customClass="h-5 w-5" />}
          </button>
        )}
      </BoxBottomBar>
    </Box>
  );
};

export default SetBilling;
