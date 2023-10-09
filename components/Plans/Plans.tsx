import { Plan } from "@/.contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  plans: Plan[];
}

const Plans: FC<Props> = ({ plans }) => {
  return (
    <section className="m-auto flex w-full max-w-3xl flex-col items-center justify-center gap-10 py-10">
      <div className="mx-auto flex flex-wrap justify-center gap-5 sm:gap-10">
        {plans.map((plan) => (
          <Link
            key={plan._id}
            href={`/plans/${plan.slug}`}
            className="relative flex h-auto w-full flex-col items-center justify-center  duration-300 hover:scale-105 xs:w-auto"
          >
            <span className="flex w-full items-center justify-center py-1 text-center text-xl font-bold sm:text-xl">
              {plan.title}
            </span>
            <Image
              src={plan.image}
              alt={plan.title}
              width={175}
              height={175}
              className="rounded-3xl border  box-shadow-full"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Plans;
