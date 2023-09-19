import { FC } from "react";
import { PlansType } from "@/types";
import Link from "next/link";
import BlurImage from "../blur-image";

interface Props {
  plans: PlansType;
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
            href={`/plans/${plan.id}`}
            key={plan.id}
            className="relative flex h-[auto] w-[auto] max-w-xs flex-col items-center justify-center overflow-hidden duration-300 hover:scale-105"
          >
            <span className="flex w-full items-center justify-center text-center text-xl font-bold">
              {plan.title}
            </span>
            <span className="h-[150px] w-[150px] min-w-[150px] overflow-auto rounded-3xl">
              <BlurImage
                image={{
                  imageURL: `/images/plans/${plan.id}.png`,
                  title: plan.title!,
                  id: plan.id!,
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

export default RestOfPlans;
