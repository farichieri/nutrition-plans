import Link from "next/link";
import { FC } from "react";

interface Props {}

const Goals: FC<Props> = () => {
  const GOALS_OPTIONS = [
    { name: "Weight Loss", link: "/signup" },
    { name: "Maintain", link: "/signup" },
    { name: "Build Muscle", link: "/signup" },
  ];

  return (
    <div className="flex w-full flex-col justify-center gap-5 py-24 text-center">
      <span className="text-4xl font-bold">Choose your goal</span>
      <div className="flex w-full justify-center gap-1 xs:gap-2 sm:gap-10">
        {GOALS_OPTIONS.map((goal) => (
          <Link
            key={goal.name}
            href={goal.link}
            className="min-w-fit rounded-3xl border border-transparent bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-inner duration-100 hover:border-green-600 xs:text-sm sm:text-base"
          >
            {goal.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Goals;
