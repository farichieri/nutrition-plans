import { FC } from "react";
import { PlansType } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

interface Props {
  plans: PlansType;
}

const Plans: FC<Props> = ({ plans }) => {
  return (
    <section className="flex w-full max-w-5xl flex-col items-center justify-center gap-10 py-10">
      <span className="text-4xl font-semibold">Meal Plans</span>
      <div className="mx-auto flex flex-wrap justify-center gap-10">
        {plans.map((plan) => (
          <Link
            href={`/plans/${plan.id}`}
            key={plan.id}
            className="relative flex items-center"
          >
            <span className="absolute inset-0">{plan.title} </span>
            <Image
              src={`/images/plans/${plan.id}.png`}
              alt={plan.title}
              width={200}
              height={200}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Plans;
