import { directories, getSortedData } from "@/utils/mds";
import { FAQS_INDEX } from "@/utils/content";
import { PlansType } from "@/types/types";
import CallToAction from "@/components/CallToAction";
import FAQS from "@/components/FAQS/FAQS";
import Image from "next/image";
import LandingLayout from "@/components/Layout/LandingLayout";
import Link from "next/link";
import Plans from "@/components/Plans/Plans";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

interface Props {
  plans: PlansType;
}

export default function Home({ plans }: Props) {
  return (
    <LandingLayout>
      <div className="flex w-full flex-col items-center gap-10 py-20">
        <div className="flex max-w-2xl flex-col items-center justify-center gap-4 text-center text-2xl">
          <h1 className="bg-gradient-to-br from-gray-600 to-black bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-gray-500 md:text-6xl">
            The best nutrition plans on the internet
          </h1>
          <div className="flex flex-col">
            <span className="text-base opacity-50 md:text-lg">
              Choose the plan that fits your requirements
            </span>
            <span className="md:text-md text-base opacity-50">
              Receive a nutrition plan every week
            </span>
          </div>
        </div>
        <div className="h-10">
          <Link href="/signup">
            <PrimaryButton onClick={() => {}} content={`Start my plan now`} />
          </Link>
        </div>
        <Image
          src="/images/general/cooking.jpg"
          width={800}
          height={800}
          alt="cooking"
          className="m-auto my-10 flex rounded-3xl shadow-lg dark:shadow-gray-400/20"
        />
      </div>
      <Plans plans={plans} />
      <FAQS content={FAQS_INDEX} />
      <CallToAction />
    </LandingLayout>
  );
}

export const getStaticProps = async () => {
  const allPostsData = getSortedData(directories.plansDirectory);
  return {
    props: { plans: allPostsData },
  };
};
