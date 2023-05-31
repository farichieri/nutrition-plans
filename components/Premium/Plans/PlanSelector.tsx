import { FC } from "react";
import {
  selectAuthSlice,
  setUpdateUser,
} from "@/features/authentication/slice";
import { updateUserPlan } from "@/services/firebase/helpers/Plans";
import { useDispatch, useSelector } from "react-redux";
import { PlansEnum } from "@/types";

interface Props {
  planID: PlansEnum;
}

const PlanSelector: FC<Props> = ({ planID }) => {
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();

  const selectPlan = async () => {
    if (!user) return;
    const res = await updateUserPlan(planID, user);
    if (!res?.error) {
      const userUpdated = {
        ...user,
        plan_selected: planID,
      };
      dispatch(setUpdateUser(userUpdated));
    }
  };

  return (
    <div className="flex w-fit min-w-fit items-center">
      {!(user?.plan_selected === planID) ? (
        <button
          className="min-w-fit rounded-3xl border border-green-500 px-4 py-1 duration-300 hover:bg-green-500/50 active:bg-green-500/20"
          onClick={selectPlan}
        >
          Make my plan
        </button>
      ) : (
        <span className={`material-icons ml-auto text-green-500`}>
          verified
        </span>
      )}
    </div>
  );
};
export default PlanSelector;
