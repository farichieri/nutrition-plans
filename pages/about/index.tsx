import LandingLayout from "@/components/Layout/LandingLayout";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const TEAM = [
    {
      name: "Fabricio Richieri",
      charge: "CEO",
      image: "fabricio-richieri",
      url: "https://www.linkedin.com/in/frichieri/",
    },
    {
      name: "Aldana Richieri",
      charge: "Nutritionist",
      image: "aldana-richieri",
      url: "https://www.linkedin.com/in/aldana-magali-richieri-9a861874/",
    },
  ];

  return (
    <LandingLayout>
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-10 py-24 ">
        <span className="text-5xl font-bold">About</span>
        <p className="">
          We&apos;re a meal planning platform that allows you to discover
          recipes and calculate your own meal plan that fits your goals and the
          type of food you choose. We know that a meal plan is a great tool to
          help you plan, and meal planning can help you stay on track no matter
          what your nutrition goal is.
        </p>
        <p className="">
          With a few simple steps - like putting together basic meals, making a
          grocery list, shopping strategically and preparing food methodically -
          meal planning becomes a useful tool to help you keep your energy up,
          meet your nutrition goals, reduce food waste and save money.
        </p>
        <p className="">
          We help you achieve your goals with the different meal plans you want
          to create and the food choices you eat. We create meal plans that make
          it easy for you to automate the week ahead. With our advanced search
          and filter tools, you&apos;ll quickly find exactly what you&apos;re
          looking for in your plan. You&apos;ll also get weekly tips from our
          staff to help you reach your goals.
        </p>
        <p className="">
          Planning healthy meals isn&apos;t difficult, but if you aren&apos;t
          used to it, planning may take a little practice. The examples we give
          should get you off to a good start. Don&apos;t be discouraged if you
          don&apos;t follow the plan exactly; it&apos;s fine if you adapt it to
          your lifestyle and needs. Do your best to incorporate healthy options
          into your day: Vegetables, fruits, lean protein, beans and legumes,
          and whole grains are always good choices.
        </p>
        <div className="my-10 flex w-full flex-col gap-5">
          <h1 className="text-5xl font-bold">Team</h1>
          <div className="flex flex-wrap gap-10 p-4">
            {TEAM.map((person) => (
              <Link
                href={person.url}
                target="_blank"
                key={person.name}
                className="flex items-center gap-2"
              >
                <span className="relative flex h-[60px] min-h-[60px] w-[60px] min-w-[60px] items-center justify-center overflow-hidden rounded-full">
                  <Image
                    src={`/images/general/${person.image}.png`}
                    alt={person.name}
                    fill
                    className="flex items-center justify-center rounded-full "
                  />
                </span>
                <div className="flex h-full flex-col justify-between gap-2 py-2">
                  <h1 className="text-xl font-semibold capitalize">
                    {person.name}
                  </h1>
                  <span className="text-sm opacity-70">{person.charge}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
