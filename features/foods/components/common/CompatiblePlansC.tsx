import { FC } from "react";
import { PlansEnum } from "@/types";
import { MdDone } from "react-icons/md";

interface Props {
  compatible_plans: any;
}

const CompatiblePlansC: FC<Props> = ({ compatible_plans }) => {
  if (!compatible_plans) {
    return <></>;
  }
  const isPlan = (plan: string) => compatible_plans[plan] === true;
  return (
    <div className="flex w-full flex-col gap-1 divide-y border-y">
      {Object.keys(PlansEnum).map((plan) => (
        <div
          key={plan}
          className="flex items-center justify-between gap-1 px-2 py-1"
        >
          <span className={`capitalize ${isPlan(plan) ? "" : ""}`}>
            {plan.replaceAll("_", " ")}
          </span>
          {isPlan(plan) && (
            <MdDone className="block h-6 w-6 min-w-fit text-green-500" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CompatiblePlansC;
