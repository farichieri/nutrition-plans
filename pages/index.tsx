import { directories, getSortedData } from "@/utils/mds";
import { FAQS_INDEX } from "@/data/content";
import { PlansType } from "@/types";
import CallToAction from "@/components/CallToAction";
import FAQS from "@/components/FAQS/FAQS";
import Goals from "@/components/Goals/Goals";
import Image from "next/image";
import LandingLayout from "@/layouts/LandingLayout";
import Link from "next/link";
import Plans from "@/components/Plans/Plans";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { blurDataURL } from "@/components/Layout/BlurDataImage";
import BlurImage from "@/components/BlurImage";

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
            <span className="w-xxs text-base font-semibold opacity-50 md:text-lg">
              Choose your nutrition goal, <br /> Adapt your diet, <br /> Follow
              your progress
            </span>
          </div>
        </div>
        <div className="h-10">
          <Link href="/signup">
            <PrimaryButton onClick={() => {}} content={`Start my plan now`} />
          </Link>
        </div>
        <div className="  my-10  ">
          <Image
            src="/images/general/landing-img.png"
            width={1200}
            height={1200}
            placeholder="blur"
            blurDataURL={blurDataURL(1200, 1200)}
            alt="cooking"
            loading="lazy"
            className="flex rounded-md border border-green-500/20 shadow-sm duration-300 hover:border-green-500/40 dark:shadow-gray-400/20"
          />
          {/* <BlurImage
            image={{
              imageURL: "/images/general/landing-img.png",
              title: "Demo",
              id: "Demo",
            }}
          /> */}
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
