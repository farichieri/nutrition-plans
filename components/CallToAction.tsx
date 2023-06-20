import Link from "next/link";
import PrimaryButton from "./Buttons/PrimaryButton";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <span className="text-4xl font-bold">Try Nutrition Plans today</span>
      <span>
        Get your first nutrition plan today and start your transformation
      </span>
      <div className="my-2 h-10">
        <Link href="/signup">
          <PrimaryButton onClick={() => {}} content="Start my plan now" />
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
