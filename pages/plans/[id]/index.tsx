import {
  directories,
  getAllPostsIds,
  getPostData,
  getSortedData,
} from "@/utils/mds";
import { PlanType, PlansType, Post } from "@/types/types";
import CallToAction from "@/components/CallToAction";
import LandingLayout from "@/components/Layout/LandingLayout";
import RestOfPlans from "@/components/Plans/RestOfPlans";

interface Props {
  planData: PlanType;
  restOfPlans: PlansType;
}

export default function Page({ planData, restOfPlans }: Props) {
  console.log({ restOfPlans });

  return (
    <LandingLayout>
      <section className="max-w-5xl py-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-5xl font-bold">{planData.title}</span>
          {/* <Date dateString={planData.date} /> */}
        </div>
        <div
          className="flex flex-col gap-4  py-10"
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
  const paths = getAllPostsIds(directories.plansDirectory);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const planData = await getPostData(directories.plansDirectory, params.id);
  const allPlansData = getSortedData(directories.plansDirectory);
  const restOfPlans = allPlansData.filter((plan) => plan.id !== params.id);

  return {
    props: {
      planData,
      restOfPlans,
    },
  };
};
