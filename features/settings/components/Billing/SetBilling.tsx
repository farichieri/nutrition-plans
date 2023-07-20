import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import { FC } from "react";
import { selectAuthSlice } from "@/features/authentication/slice";
import { setIsBillingModalOpen } from "@/features/layout/slice";
import { useDispatch, useSelector } from "react-redux";

interface Props {}

const SetBilling: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();

  return (
    <Box>
      <BoxMainContent>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-1">
            <span>Current plan:</span>
            <span className="rounded-md bg-slate-300/50 p-1 capitalize">
              {user?.subscriptionState}
            </span>
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <span>Unlock all benefits, from $8/month</span>
            </div>
          </div>
        </div>
      </BoxMainContent>

      <BoxBottomBar>
        <button
          onClick={() => dispatch(setIsBillingModalOpen(true))}
          className="bold:border-green-800 group ml-auto flex w-fit items-center justify-center gap-1 rounded-3xl bg-gradient-to-r from-green-700 via-green-500 to-green-400 px-3 py-1.5 font-semibold text-white duration-300 hover:shadow-[0_1px_40px] hover:shadow-green-300 dark:hover:shadow-green-400/50"
        >
          <span>Upgrade now</span>
        </button>
      </BoxBottomBar>
    </Box>
  );
};

export default SetBilling;
