import { directories, getSortedData } from "@/utils/mds";
import { FAQS_INDEX } from "@/utils/content";
import { PlansType } from "@/types/types";
import CallToAction from "@/components/CallToAction";
import FAQS from "@/components/FAQS/FAQS";
import Goals from "@/components/Goals/Goals";
import Image from "next/image";
import LandingLayout from "@/components/Layout/LandingLayout";
import Link from "next/link";
import Plans from "@/components/Plans/Plans";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { blurDataURL } from "@/components/Layout/BlurDataImage";

interface Props {
  plans: PlansType;
}

export default function Home({ plans }: Props) {
  return (
    <LandingLayout>
      <div className="flex w-full flex-col items-center gap-10 py-20">
        <div className="flex max-w-2xl flex-col items-center justify-center gap-4 text-center text-2xl">
          <h1 className="bg-gradient-to-br from-gray-600 to-black bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-gray-500 md:text-6xl">
            Nutrition plans that lead to results
          </h1>
          <div className="flex flex-col">
            <span className="text-base font-semibold opacity-50 md:text-lg">
              Choose your nutrition goals
            </span>
            <span className="text-base font-semibold opacity-50 md:text-lg">
              Adapt your diet
            </span>
            <span className="text-base font-semibold opacity-50 md:text-lg">
              Follow your progress
            </span>
          </div>
        </div>
        <div className="h-10">
          <Link href="/signup">
            <PrimaryButton onClick={() => {}} content={`Start my plan now`} />
          </Link>
        </div>
        <div className="my-10 ">
          <Image
            src="/images/general/cooking.jpg"
            width={800}
            height={1200}
            placeholder="blur"
            blurDataURL={blurDataURL(800, 1200)}
            alt="cooking"
            loading="lazy"
            className="flex rounded-3xl shadow-lg dark:shadow-gray-400/20"
          />
        </div>
      </div>
      <Goals />
      <span className="text-4xl font-bold">Plans Available</span>
      <Plans plans={plans} />
      <FAQS content={FAQS_INDEX} />
      <CallToAction />
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
