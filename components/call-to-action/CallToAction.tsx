import Link from "next/link";
import PrimaryButton from "../Buttons/PrimaryButton";

const CallToAction = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 text-center">
      <h2 className="mx-auto my-0 flex w-fit py-0 text-4xl font-extrabold sm:text-5xl">
        Try Nutrition Plans today
      </h2>
      <p className="my-0 py-0">
        Access to your first nutrition plan today and start your transformation
      </p>
      <div className="my-2 h-10">
        <Link href="/signup">
          <PrimaryButton onClick={() => {}} content="Try it for free" />
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
