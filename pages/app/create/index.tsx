import { selectAuthSlice } from "@/store/slices/authSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import BodyFeatures from "@/components/Premium/Calculator/BodyFeatures";
import FoodPreferences from "@/components/Premium/Calculator/FoodPreferences";
import NewUserSteps from "@/components/Premium/Create/NewUserSteps";

export default function Page() {
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signup");
    }
  }, [user]);

  const STEPS = [
    { step: 1, name: "Body Features" },
    { step: 2, name: "Food Preferences" },
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

  console.log({ stepSelected });

  return (
    <section className="min-w-screen flex min-h-screen w-full flex-col items-center gap-10 px-4 py-14">
      <span className="text-2xl font-bold">Nutrition Plans</span>
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <NewUserSteps
          steps={STEPS}
          stepSelected={stepSelected}
          setStepSelected={setStepSelected}
        />
        <div className="w-full max-w-lg rounded-3xl px-4 py-10 shadow-[0_3px_10px] shadow-slate-500/50">
          {stepSelected === STEPS[0].step ? (
            <div className="flex w-full flex-col items-center gap-10">
              <span className="text-3xl font-semibold">Body features</span>
              <BodyFeatures handleSubmit={handleContinue} />
            </div>
          ) : STEPS[1].step ? (
            <div className="flex w-full flex-col items-center gap-10">
              <button
                className="mr-auto rounded-3xl bg-green-500 px-2 py-1 text-white shadow hover:bg-green-600"
                onClick={handleBack}
              >
                Back
              </button>
              <span className="text-3xl font-semibold">
                My Food preferences
              </span>
              <FoodPreferences handleSubmit={handleContinue} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
