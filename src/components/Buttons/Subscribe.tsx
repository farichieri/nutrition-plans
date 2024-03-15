import {
  selectLayoutSlice,
  setIsSubscribeModalOpen,
} from "@/features/layout/slice";
import { MdVerified } from "react-icons/md";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";

const SubscribeButton = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { isSubscribeModalOpen } = useSelector(selectLayoutSlice);

  return (
    <>
      {user?.isPremium ? (
        <span className="flex items-center gap-1 rounded-3xl  p-2 font-semibold text-green-500">
          Premium <MdVerified className="h-5 w-5 text-green-500" />
        </span>
      ) : (
        <button
          className={`bold:border-green-800 group flex w-fit items-center justify-center gap-1 rounded-3xl bg-gradient-to-r from-green-700 via-green-500 to-green-400 px-3 py-1.5 font-semibold text-white duration-300 hover:shadow-[0_1px_40px] hover:shadow-green-300 dark:hover:shadow-green-400/50 ${
            isSubscribeModalOpen ? "border-green-500" : "border-transparent"
          }`}
          onClick={() => dispatch(setIsSubscribeModalOpen(true))}
        >
          <span>Upgrade now</span>
        </button>
      )}
    </>
  );
};

export default SubscribeButton;
