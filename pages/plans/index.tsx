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
      <Plans plans={plans} />
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
