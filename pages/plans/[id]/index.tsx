import { getAllMDIDS, getAllMDData, MDDirectories } from "@/utils/mds";
import { getPlansAvailable } from "@/utils";
import { PlanType, PlansType } from "@/types";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import BlurImage from "@/components/blur-image";
import CallToAction from "@/components/call-to-action/CallToAction";
import Image from "next/image";
import LandingLayout from "@/layouts/LandingLayout";
import remarkGfm from "remark-gfm";
import RestOfPlans from "@/components/Plans/RestOfPlans";

interface Props {
  planData: PlanType;
  restOfPlans: PlansType;
}

export default function Page({ planData, restOfPlans }: Props) {
  return (
    <LandingLayout>
      <section className="flex max-w-5xl flex-col items-center justify-center py-24">
        <div className="mb-10 flex w-full flex-col items-center justify-center gap-4">
          <span className="mb-10 text-5xl font-bold md:text-6xl lg:text-7xl">
            {planData.title}
          </span>

          <span className="h-full w-full max-w-[500px] overflow-hidden rounded-3xl shadow-[0_1px_5px_gray] dark:shadow-[0px_1px_5px_#4040408c]">
            <BlurImage
              image={{
                imageURL: planData.image!,
                title: planData.title!,
                id: planData.id,
              }}
              customContainerClass="!aspect-h-1 !aspect-w-1"
            />
          </span>
        </div>
        <ReactMarkdown
          className="border-b pb-14"
          remarkPlugins={[remarkGfm]}
          components={{
            img: (props) => (
              <div className="relative mx-auto my-5 h-[50vh] w-full">
                <Image
                  src={props.src || ""}
                  alt={props.alt || ""}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            ),
            li: (props) => (
              <li
                className=" before:absolute before:-ml-4 before:inline-block before:text-gray-500 before:content-['–']"
                {...props}
              />
            ),
          }}
        >
          {planData.content!}
        </ReactMarkdown>
        <RestOfPlans plans={restOfPlans} />
        <CallToAction />
      </section>
    </LandingLayout>
  );
}

export const getStaticPaths = async () => {
  const paths = getAllMDIDS(MDDirectories.plans);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const planData = await getAllMDData(MDDirectories.plans, params.id);
  const plansAvailable = getPlansAvailable();
  const restOfPlans = plansAvailable.filter((plan) => plan.id !== params.id);

  return {
    props: {
      planData,
      restOfPlans,
    },
  };
};
