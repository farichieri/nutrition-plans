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
        <p className="text-xl">
          We&apos;re a meal planning platform that allows you to discover
          recipes and calculate your own meal plan that fits your goals and the
          type of food you choose. We know that a meal plan is a great tool to
          help you plan, and meal planning can help you stay on track no matter
          what your nutrition goal is.
        </p>
        <p className="text-xl">
          With a few simple steps - like putting together basic meals, making a
          grocery list, shopping strategically and preparing food methodically -
          meal planning becomes a useful tool to help you keep your energy up,
          meet your nutrition goals, reduce food waste and save money.
        </p>
        <p className="text-xl">
          We help you achieve your goals with the different meal plans you want
          to create and the food choices you eat. We create meal plans that make
          it easy for you to automate the week ahead. With our advanced search
          and filter tools, you&apos;ll quickly find exactly what you&apos;re
          looking for in your plan. You&apos;ll also get weekly tips from our
          staff to help you reach your goals.
        </p>
        <div className="my-10 flex w-full flex-col gap-5">
          <h1 className="text-5xl font-bold">Team</h1>
          <div className="flex gap-10 p-4">
            {TEAM.map((person) => (
              <Link
                href={person.url}
                target="_blank"
                key={person.name}
                className="flex items-center gap-2"
              >
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full">
                  <Image
                    src={`/images/general/${person.image}.png`}
                    alt={person.name}
                    fill
                    className="flex items-center justify-center rounded-full object-fill"
                  />
                </span>
                <div className="flex h-full flex-col justify-between gap-2 py-2">
                  <h1 className="text-xl font-semibold">{person.name}</h1>
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
