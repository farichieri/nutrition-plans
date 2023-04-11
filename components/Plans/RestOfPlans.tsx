import { PlansType } from "@/types/types";
import Link from "next/link";
import { FC } from "react";

interface Props {
  plans: PlansType;
}

const RestOfPlans: FC<Props> = ({ plans }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {plans.map((plan) => (
        <Link href={`/plans/${plan.id}`} key={plan.id}>
          {plan.title}
        </Link>
      ))}
    </div>
  );
};

export default RestOfPlans;
