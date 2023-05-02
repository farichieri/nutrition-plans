import { selectAuthSlice } from "@/store/slices/authSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import BodyFeatures from "@/components/Premium/Calculator/BodyFeatures";
import FoodPreferences from "@/components/Premium/Calculator/FoodPreferences";
import NewUserSteps from "@/components/Premium/Create/NewUserSteps";
import Results from "@/components/Premium/Calculator/Results";

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
    { step: 2, name: "Food Preferences" },
    { step: 3, name: "Start" },
  ];
  const [stepSelected, setStepSelected] = useState(1);

  const handleContinue = () => {
    if (stepSelected === 1) {
    } else if (stepSelected === 2) {
    }
    setStepSelected(stepSelected + 1);
  };

  const handleBack = () => {
    if (stepSelected > 1) {
      setStepSelected(stepSelected - 1);
    }
  };

  return (
    <section className="min-w-screen flex min-h-screen w-full flex-col items-center gap-10 py-8">
      <span className="text-2xl font-bold">Nutrition Plans</span>
      <div className="flex w-full flex-col items-center justify-center ">
        <NewUserSteps
          steps={STEPS}
          stepSelected={stepSelected}
          setStepSelected={setStepSelected}
        />
        <div className="w-full max-w-5xl rounded-3xl px-4 py-4">
          {stepSelected === STEPS[0].step ? (
            <div className="flex w-full flex-col items-center gap-10">
              {/* <span className="text-3xl font-semibold">Body features</span> */}
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
              {/* <span className="text-3xl font-semibold">
                My Food preferences
              </span> */}
              <FoodPreferences handleSubmit={handleContinue} />
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
