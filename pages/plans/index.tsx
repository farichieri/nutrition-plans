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
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-10 py-24 ">
        <span className="text-5xl font-bold">Plans</span>
        <Plans plans={plans} />
      </div>
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
