import {
  selectAuthSlice,
  setIsSelectingPlan,
  setUpdateUser,
  updateUserPlan,
} from "@/features/authentication";
import { FC } from "react";
import { PlansEnum } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Loader/Spinner";
import { MdVerified } from "react-icons/md";

interface Props {
  planID: PlansEnum;
}

const PlanSelector: FC<Props> = ({ planID }) => {
  const { user, isSelectingPlan } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();

  const selectPlan = async () => {
    if (!user) return;
    dispatch(setIsSelectingPlan(true));
    const res = await updateUserPlan(planID, user);
    if (res.result === "success") {
      const userUpdated = {
        ...user,
        plan_selected: planID,
      };
      dispatch(setUpdateUser(userUpdated));
    }
    dispatch(setIsSelectingPlan(false));
  };

  return (
    <div className="flex w-fit min-w-fit items-center">
      {!(user?.plan_selected === planID) ? (
        <button
          className="min-w-fit rounded-3xl border border-green-500 px-4 py-1 duration-300 hover:bg-green-500/50 active:bg-green-500/20"
          onClick={selectPlan}
        >
          {isSelectingPlan ? (
            <span className="flex items-center gap-2">
              <span>Make my plan</span>
              <Spinner customClass="w-4 h-4" />
            </span>
          ) : (
            <span>Make my plan</span>
          )}
        </button>
      ) : (
        <MdVerified className={`ml-auto h-6 w-6 text-green-500`} />
      )}
    </div>
  );
};
export default PlanSelector;
