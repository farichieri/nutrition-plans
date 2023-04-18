import { FC } from "react";
import { PlansType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  plans: PlansType;
}

const RestOfPlans: FC<Props> = ({ plans }) => {
  return (
    <section className="flex w-full max-w-5xl flex-col items-center justify-center gap-10 py-10">
      <span className="text-4xl font-semibold">Other Plans</span>
      <div className="mx-auto flex flex-wrap justify-center gap-10">
        {plans.map((plan) => (
          <Link
            href={`/plans/${plan.id}`}
            key={plan.id}
            className="relative flex h-[auto] max-h-32 w-[auto] max-w-xs items-center justify-center overflow-hidden rounded-xl"
          >
            <span className="absolute flex w-full items-center justify-center bg-white/70 text-center text-xl font-bold text-black">
              {plan.title}{" "}
            </span>
            <Image
              src={`/images/plans/${plan.id}.png`}
              alt={plan.title}
              width={150}
              height={150}
              className="object-contain"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RestOfPlans;
