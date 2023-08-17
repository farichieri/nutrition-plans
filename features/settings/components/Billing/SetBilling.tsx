import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import { FC, useState } from "react";
import { selectAuthSlice } from "@/features/authentication/slice";
import { useDispatch, useSelector } from "react-redux";
import { sendCustomerToPortal } from "@/features/stripe";
import Spinner from "@/components/Loader/Spinner";

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
                <span>Unlock all benefits, from $8/month</span>
              </div>
            </div>
          )}
        </div>
      </BoxMainContent>

      <BoxBottomBar>
        {!user.isPremium ? (
          <button
            onClick={() => {}}
            className="bold:border-green-800 group ml-auto flex w-fit items-center justify-center gap-1 rounded-3xl bg-gradient-to-r from-green-700 via-green-500 to-green-400 px-3 py-1.5 font-semibold text-white duration-300 hover:shadow-[0_1px_40px] hover:shadow-green-300 dark:hover:shadow-green-400/50"
          >
            <span>Upgrade now</span>
          </button>
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
