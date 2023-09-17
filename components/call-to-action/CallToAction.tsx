import Link from "next/link";
import PrimaryButton from "../Buttons/PrimaryButton";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <span className="mx-auto flex w-fit text-4xl font-bold sm:text-5xl">
        Try Nutrition Plans today
      </span>
      <span>
        Access to your first nutrition plan today and start your transformation
      </span>
      <div className="my-2 h-10">
        <Link href="/signup">
          <PrimaryButton onClick={() => {}} content="Try it for free" />
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
