import { FC } from "react";
import Link from "next/link";
import { Plan } from "@/.contentlayer/generated";
import Image from "next/image";

interface Props {
  plans: Plan[];
}

const RestOfPlans: FC<Props> = ({ plans }) => {
  return (
    <section className="flex w-full max-w-5xl flex-col items-center justify-center gap-10 py-10">
      <h2 className="mx-auto my-0 flex w-fit py-0 text-4xl font-extrabold sm:text-5xl">
        Other plans Available
      </h2>
      <div className="mx-auto flex flex-wrap justify-center gap-5 sm:gap-10">
        {plans.map((plan) => (
          <Link
            href={`/plans/${plan.slug}`}
            key={plan._id}
            className="relative flex h-[auto] w-[auto] max-w-xs flex-col items-center justify-center overflow-hidden duration-300 hover:scale-105"
          >
            <span className="flex w-full items-center justify-center text-center text-xl font-bold">
              {plan.title}
            </span>
            <Image
              src={plan.image}
              alt={plan.title}
              width={150}
              height={150}
              className="rounded-3xl"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RestOfPlans;
