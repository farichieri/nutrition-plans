import Link from "next/link";
import PrimaryButton from "../Buttons/PrimaryButton";
import Reveal from "../Reveal/Reveal";

const CallToAction = () => {
  return (
    <Reveal>
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <span className="text-4xl font-bold">Try Nutrition Plans today</span>
        <span>
          Access to your first nutrition plan today and start your
          transformation
        </span>
        <div className="my-2 h-10">
          <Link href="/signup">
            <PrimaryButton onClick={() => {}} content="Try it for free" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
};

export default CallToAction;
