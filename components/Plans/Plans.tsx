import { FC } from "react";
import { Plan } from "@/.contentlayer/generated";
import BlurImage from "../blur-image";
import Link from "next/link";

interface Props {
  plans: Plan[];
}

const Plans: FC<Props> = ({ plans }) => {
  return (
    <section className="m-auto flex w-full max-w-3xl flex-col items-center justify-center gap-10 py-10">
      <div className="mx-auto flex flex-wrap justify-center gap-5 sm:gap-10">
        {plans.map((plan) => (
          <Link
            href={`/plans/${plan.id}`}
            key={plan.id}
            className="relative flex h-auto w-full max-w-xs flex-col items-center justify-center overflow-hidden duration-300 hover:scale-105 xs:w-auto"
          >
            <span className="flex w-full items-center justify-center py-1 text-center text-xl font-bold sm:text-2xl">
              {plan.title}
            </span>
            <span
              aria-hidden="true"
              className="h-auto w-full min-w-[150px] overflow-auto rounded-3xl sm:h-[200px] sm:w-[200px] "
            >
              <BlurImage
                image={{
                  imageURL: plan.image,
                  title: plan.title,
                  id: plan.id,
                }}
                customClass=""
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Plans;
