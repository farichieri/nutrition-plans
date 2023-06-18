import { NewUserSteps } from "@/features/authentication";
import { selectAuthSlice } from "@/features/authentication/slice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import BodyFeatures from "@/features/authentication/components/create-user/body-features/BodyFeatures";
import Goal from "@/features/authentication/components/create-user/goal/Goal";
import PlanSelector from "@/features/authentication/components/create-user/select-plan/PlanSelector";
import Results from "@/features/authentication/components/create-user/results/Results";
import ThemeSwitcher from "@/components/theme-switcher";

export default function Page() {
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();

  console.log({ user });

  useEffect(() => {
    if (!user) {
      router.push("/signup");
    }
    if (user?.is_profile_completed) {
      router.push("/app");
    }
  }, [user, router]);

  const STEPS = [
    {
      step: 1,
      name: "Body",
      icon: (
        <span className="material-icons text-green-500 ">
          settings_accessibility
        </span>
      ),
    },
    {
      step: 2,
      name: "Goal",
      icon: (
        <span className="material-icons text-green-500 ">emoji_events</span>
      ),
    },
    {
      step: 3,
      name: "Plan",
      icon: <span className="material-icons text-green-500 ">description</span>,
    },
    {
      step: 4,
      name: "Start",
      icon: <span className="material-icons text-green-500 ">flag</span>,
    },
  ];
  const [stepSelected, setStepSelected] = useState(1);

  const handleContinue = () => {
    setStepSelected(stepSelected + 1);
  };

  const handleBack = () => {
    if (stepSelected > 1) {
      setStepSelected(stepSelected - 1);
    }
  };

  return (
    <section className="min-w-screen flex min-h-screen w-full flex-col items-center justify-start px-4 py-4">
      <div className="ml-auto mr-4">
        <ThemeSwitcher withText={false} />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <span className="text-2xl font-bold">Nutrition Plans</span>
        <span className="">
          Let&apos;s start your transformation,{" "}
          <b className="capitalize text-green-500">{user?.display_name}</b>!
        </span>
        <div className="flex w-full flex-col items-center justify-center ">
          <NewUserSteps steps={STEPS} stepSelected={stepSelected} />
          <div className="w-full max-w-3xl rounded-3xl py-4">
            {stepSelected === STEPS[0].step ? (
              <div className="flex w-full flex-col items-center gap-10">
                <BodyFeatures handleContinue={handleContinue} />
              </div>
            ) : stepSelected === STEPS[1].step ? (
              <div className="flex w-full flex-col items-center gap-5">
                <button
                  className="mr-auto rounded-md border border-green-500 bg-green-500/50 px-2 py-0.5 text-white hover:bg-green-600"
                  onClick={handleBack}
                >
                  Back
                </button>
                <Goal handleContinue={handleContinue} />
              </div>
            ) : stepSelected === STEPS[2].step ? (
              <div className="flex w-full flex-col items-center gap-5">
                <button
                  className="mr-auto rounded-md border border-green-500 bg-green-500/50 px-2 py-0.5 text-white hover:bg-green-600"
                  onClick={handleBack}
                >
                  Back
                </button>
                <PlanSelector handleContinue={handleContinue} />
              </div>
            ) : (
              <div className="flex w-full flex-col items-center gap-5">
                <button
                  className="mr-auto rounded-md border border-green-500 bg-green-500/50 px-2 py-0.5 text-white hover:bg-green-600"
                  onClick={handleBack}
                >
                  Back
                </button>
                <Results handleSubmit={handleContinue} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
