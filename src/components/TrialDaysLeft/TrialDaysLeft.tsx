import { selectAuthSlice } from "@/features/authentication";
import { setIsSubscribeModalOpen } from "@/features/layout/slice";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {}

const TrialDaysLeft: FC<Props> = () => {
  const { user, trialDaysLeft } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();

  if (!user) return <></>;

  const handleClick = () => {
    dispatch(setIsSubscribeModalOpen(true));
  };

  if (user.isPremium) return <></>;
  return (
    <>
      <button
        onClick={handleClick}
        className="flex justify-center p-1 text-xs font-light capitalize opacity-70"
      >
        {trialDaysLeft} days left
      </button>
    </>
  );
};

export default TrialDaysLeft;
