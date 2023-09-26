import Link from "next/link";
import PrimaryButton from "../Buttons/PrimaryButton";

const CallToAction = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 rounded-2xl px-2 py-10 text-center  sm:px-10">
      <h2 className="mx-auto my-0 flex w-fit py-0 text-4xl font-extrabold sm:text-5xl">
        Try Nutrition Plans today
      </h2>
      <p className="my-0 py-0 leading-6 ">
        Access to our meal planner today and start your transformation
      </p>
      <div className="mt-2 h-10">
        <Link href="/signup">
          <PrimaryButton onClick={() => {}} content="Try it for free" />
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
