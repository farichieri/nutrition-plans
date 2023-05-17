import { directories, getSortedData } from "@/utils/mds";
import { PlansType } from "@/types/types";
import LandingLayout from "@/components/Layout/LandingLayout";
import Plans from "@/components/Plans/Plans";

interface Props {
  plans: PlansType;
}

export default function Page({ plans }: Props) {
  return (
    <LandingLayout>
      <section className="flex w-full max-w-5xl flex-col items-center justify-start gap-10 py-24">
        <span className="text-5xl font-bold">Plans</span>
        <p>
          Nutrition plans are essential for a healthy diet. That's why we
          develop different diet plans to suit your goals, tastes and personal
          requirements, helping you achieve your desired goal in a calculated
          and simple way. Do not worry about the composition, we will do it for
          you.
        </p>
        <p>
          We have created simple, effective and unique plans to plan your meals.
          Each plan includes the macronutrients needed for your chosen goal,
          daily energy requirements, and additional tools to help you complete
          your weekly meals. They are designed to provide you with the
          carbohydrates, proteins and fats your body needs each day to function
          optimally.
        </p>
        <Plans plans={plans} />
      </section>
    </LandingLayout>
  );
}

export const getStaticProps = async () => {
  const allPlansData = getSortedData(directories.plansDirectory);
  const plansAvailable = allPlansData.filter((plan: any) => plan.isAvailable);
  return {
    props: { plans: plansAvailable },
  };
};
