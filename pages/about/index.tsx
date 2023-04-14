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
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-4 py-24 ">
        <span className="text-5xl font-bold">About</span>
        <p className="text-xl">
          We aim to help people to achieve their nutrition goals easily,
          providing them with a defined nutrition plan for every week plus a
          guide in how to stick with the health disciplines
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
                <span className="relative flex h-12 w-12 items-center justify-center">
                  <Image
                    src={`/images/general/${person.image}.png`}
                    alt={person.name}
                    fill
                    className="relative flex max-h-[75px] max-w-[75px] rounded-full bg-white"
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
