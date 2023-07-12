import {
  directories,
  getAllMDIDS,
  getAllMDData,
  getSortedData,
} from "@/utils/mds";
import { PlanType, PlansType } from "@/types";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import BlurImage from "@/components/BlurImage";
import CallToAction from "@/components/CallToAction";
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
        <div className="mb-10 flex flex-col items-center justify-center gap-4">
          <span className="mb-10 text-5xl font-bold md:text-6xl lg:text-7xl">
            {planData.title}
          </span>

          <span className="h-[500px] w-[500px] overflow-auto rounded-3xl shadow-[0_1px_5px_gray] dark:shadow-[0px_1px_5px_#4040408c]">
            <BlurImage
              image={{
                imageURL: planData.image,
                title: planData.title,
                id: planData.id,
              }}
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
          {planData.content}
        </ReactMarkdown>
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
