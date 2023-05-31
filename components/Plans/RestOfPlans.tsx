import { FC } from "react";
import { PlansType } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  plans: PlansType;
}

const RestOfPlans: FC<Props> = ({ plans }) => {
  return (
    <section className="flex w-full max-w-5xl flex-col items-center justify-center gap-10 py-10">
      <span className="text-center text-4xl font-bold">
        Other plans Available
      </span>
      <div className="mx-auto flex flex-wrap justify-center gap-5 sm:gap-10">
        {plans.map((plan) => (
          <Link
            href={`/plans/${plan.id}`}
            key={plan.id}
            className="relative flex h-[auto] w-[auto] max-w-xs flex-col items-center justify-center overflow-hidden duration-300 hover:scale-105"
          >
            <span className="flex w-full items-center justify-center text-center text-xl font-bold">
              {plan.title}
            </span>
            <Image
              src={`/images/plans/${plan.id}.jpg`}
              alt={plan.title}
              width={150}
              height={150}
              className="m-2 rounded-3xl shadow-[0_1px_5px_gray] dark:shadow-[0px_1px_5px_#4040408c]"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RestOfPlans;
