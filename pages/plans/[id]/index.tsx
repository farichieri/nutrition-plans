import {
  directories,
  getAllMDIDS,
  getAllMDData,
  getSortedData,
} from "@/utils/mds";
import { PlanType, PlansType, Post } from "@/types/types";
import CallToAction from "@/components/CallToAction";
import LandingLayout from "@/components/Layout/LandingLayout";
import RestOfPlans from "@/components/Plans/RestOfPlans";
import Image from "next/image";

interface Props {
  planData: PlanType;
  restOfPlans: PlansType;
}

export default function Page({ planData, restOfPlans }: Props) {
  return (
    <LandingLayout>
      <section className="flex max-w-5xl flex-col items-center justify-center py-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-5xl font-bold">{planData.title}</span>
          <Image
            src={planData.image}
            alt={planData.title}
            width={1024}
            height={1024}
            priority
            className="m-2 rounded-3xl shadow-[0_1px_5px_gray] dark:shadow-[0px_1px_5px_#4040408c]"
          />
        </div>
        <div
          className="flex flex-col gap-4 py-10"
          dangerouslySetInnerHTML={{
            __html: planData.contentHtml,
          }}
        />
        <RestOfPlans plans={restOfPlans} />
        <CallToAction />
      </section>
    </LandingLayout>
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
  const plansAvailable = allPlansData.filter((plan: any) => plan.isAvailable);
  const restOfPlans = plansAvailable.filter((plan) => plan.id !== params.id);

  return {
    props: {
      planData,
      restOfPlans,
    },
  };
};
