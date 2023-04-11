import { FC } from "react";
import { PlansType } from "@/types/types";
import Link from "next/link";

interface Props {
  plans: PlansType;
}

const Plans: FC<Props> = ({ plans }) => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-10 py-10">
      <span className="text-4xl font-semibold">Meal Plans</span>
      <div className="flex flex-wrap gap-10">
        {plans.map((plan) => (
          <Link href={`/plans/${plan.id}`} key={plan.id}>
            <span>{plan.title} </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Plans;
