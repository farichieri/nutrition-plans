import { FC } from "react";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { setIsBillingModalOpen } from "@/store/slices/layoutSlice";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

interface Props {
  setSettingSelected: Function;
}

const Subscription: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex gap-1">
        <span>Current plan:</span>
        <span className="capitalize">{user?.premium_plan}</span>
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <span>Standard</span>
          <span>Unlock all nutrition plans, from $8/month</span>
        </div>
      </div>
      <div className="items-center">
        <button
          onClick={() => dispatch(setIsBillingModalOpen(true))}
          className="bold:border-green-800 group mt-auto flex w-fit items-center justify-center gap-1 rounded-3xl bg-gradient-to-r from-green-700 via-green-500 to-green-400 px-3 py-1 font-semibold text-white duration-300 hover:shadow-[0_1px_40px] hover:shadow-green-300 dark:hover:shadow-green-400/50"
        >
          <span>Upgrade now</span>
        </button>
      </div>
    </div>
  );
};

export default Subscription;
