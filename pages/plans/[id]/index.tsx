import { BlogPosting, WithContext } from "schema-dts";
import { getAllMDIDS, getAllMDData, MDDirectories } from "@/utils/mds";
import { getPlansAvailable } from "@/utils";
import { PlanType, PlansType } from "@/types";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { StructuredData } from "@/components";
import { useCanonicalURL } from "@/hooks";
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
  const canonicalURL = useCanonicalURL();

  const structuredData: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: planData.title,
    description: planData.description,
    isFamilyFriendly: true,
    image: [planData.image],
    author: {
      "@type": "Person",
      name: "Nutrition Plans CO",
    },
    url: canonicalURL,
    publisher: {
      "@type": "Organization",
      name: "Nutrition Plans CO",
      logo: {
        "@type": "ImageObject",
        url: "https://nutritionplans.co/images/logo.png",
      },
    },
    datePublished: planData.date,
    dateModified: planData.date,
  };

  return (
    <LandingLayout>
      <StructuredData data={structuredData}>
        <title>{`${planData.title} | Nutrition Plans CO`}</title>{" "}
        <link rel="canonical" href={canonicalURL} />
        <meta name="description" content={planData.description} />
        <meta property="article:author" content="Nutrition Plans CO" />
        <meta property="article:published_time" content={planData.date} />
        <meta property="article:section" content="Blog" />
        <meta property="og:description" content={planData.description} />
        <meta property="og:image:secure_url" content={planData.image} />
        <meta property="og:image" content={planData.image} key="image" />
        <meta
          property="og:title"
          content={`${planData.title} | Nutrition Plans CO`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalURL} />
        <meta
          property="title"
          content={`${planData.title} | Nutrition Plans CO`}
        />
      </StructuredData>
      <article className="flex w-full max-w-5xl flex-col items-center justify-center">
        <div className="mb-10 mt-14 flex w-full flex-col items-center justify-center gap-4">
          <h1 className="mb-8 text-5xl font-extrabold md:text-6xl lg:text-7xl">
            {planData.title}
          </h1>

          <figure className="h-full w-full max-w-[500px] overflow-hidden rounded-3xl shadow-[0_1px_5px_gray] dark:shadow-[0px_1px_5px_#4040408c]">
            <BlurImage
              image={{
                imageURL: planData.image!,
                title: planData.title!,
                id: planData.id,
              }}
              customContainerClass="!aspect-h-1 !aspect-w-1"
            />
          </figure>
        </div>
        <ReactMarkdown
          className="border-b pb-14 "
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
            h2: (props) => (
              <h2 className="mb-5 mt-20 text-3xl" {...props}>
                {}
              </h2>
            ),
          }}
        >
          {planData.content!}
        </ReactMarkdown>
      </article>
      <RestOfPlans plans={restOfPlans} />
      <div className="my-24">
        <CallToAction />
      </div>
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
