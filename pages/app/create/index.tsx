import { selectAuthSlice } from "@/store/slices/authSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import BodyFeatures from "@/components/Premium/Calculator/BodyFeatures";
import NewUserSteps from "@/components/Premium/Create/NewUserSteps";
import PlanSelector from "@/components/Premium/Calculator/PlanSelector";
import Results from "@/components/Premium/Calculator/Results";
import ThemeSwitcher from "@/components/theme-switcher";

export default function Page() {
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signup");
    }
    if (user?.is_profile_completed) {
      router.push("/app");
    }
  }, [user]);

  const STEPS = [
    { step: 1, name: "Body Features" },
    { step: 2, name: "Select Plan" },
    { step: 3, name: "Start" },
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
    <section className="min-w-screen flex min-h-screen w-full flex-col items-center gap-10 px-4 py-4">
      <div className="ml-auto mr-4">
        <ThemeSwitcher isPremium={false} />
      </div>
      <span className="text-2xl font-bold">Nutrition Plans</span>
      <div className="flex w-full flex-col items-center justify-center ">
        <NewUserSteps
          steps={STEPS}
          stepSelected={stepSelected}
          setStepSelected={setStepSelected}
        />
        <div className="w-full max-w-5xl rounded-3xl py-4">
          {stepSelected === STEPS[0].step ? (
            <div className="flex w-full flex-col items-center gap-10">
              <BodyFeatures handleSubmit={handleContinue} />
            </div>
          ) : stepSelected === STEPS[1].step ? (
            <div className="flex w-full flex-col items-center gap-5">
              <button
                className="mr-auto rounded-md border border-green-500 bg-green-500/50 px-2 py-0.5 text-white hover:bg-green-600"
                onClick={handleBack}
              >
                Back
              </button>
              <PlanSelector handleSubmit={handleContinue} />
            </div>
          ) : (
            <div className="flex w-full flex-col items-center gap-10">
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
    </section>
  );
}
