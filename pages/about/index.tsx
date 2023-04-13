import LandingLayout from "@/components/Layout/LandingLayout";

export default function Page() {
  return (
    <LandingLayout>
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-4 py-24 ">
        <span className="text-5xl font-bold">About</span>
        <p className="text-xl">
          We aim to help people to achieve their nutrition goals easily,
          providing them with a defined nutrition plan for every week plus a
          guide in how to stick with the health disciplines
        </p>
      </div>
    </LandingLayout>
  );
}
