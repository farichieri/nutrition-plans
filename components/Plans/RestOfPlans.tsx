import { PlansType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  plans: PlansType;
}

const RestOfPlans: FC<Props> = ({ plans }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {plans.map((plan) => (
        <Link href={`/plans/${plan.id}`} key={plan.id}>
          <span>{plan.title}</span>
          <Image
            src={`/images/plans/${plan.id}.png`}
            alt={plan.title}
            width={200}
            height={200}
          />
        </Link>
      ))}
    </div>
  );
};

export default RestOfPlans;
