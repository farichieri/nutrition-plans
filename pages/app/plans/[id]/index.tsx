import PremiumLayout from "@/components/Layout/PremiumLayout";
import { PlanType } from "@/types/types";
import {
  directories,
  getAllMDData,
  getAllMDIDS,
  getSortedData,
} from "@/utils/mds";

interface Props {
  planData: PlanType;
}

export default function Page({ planData }: Props) {
  return (
    <PremiumLayout>
      <section className="p-4">
        <span>{planData.title}</span>
      </section>
    </PremiumLayout>
  );
}

export const getStaticPaths = async () => {
  const paths = getAllMDIDS(directories.plansDirectory);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const planData = await getAllMDData(directories.plansDirectory, params.id);
  const allPlansData = getSortedData(directories.plansDirectory);
  const restOfPlans = allPlansData.filter((plan) => plan.id !== params.id);

  return {
    props: {
      planData,
      restOfPlans,
    },
  };
};
