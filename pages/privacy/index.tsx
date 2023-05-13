import LandingLayout from "@/components/Layout/LandingLayout";

export default function Page() {
  return (
    <LandingLayout>
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-4 px-4 py-24">
        <span className="text-5xl font-bold">Terms of privacy</span>
        <p className="text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore omnis
          a, ea maiores non maxime aperiam aspernatur. Quaerat nulla vitae saepe
          suscipit modi at, consequuntur quo fugit doloribus! Delectus,
          mollitia.
        </p>
      </div>
    </LandingLayout>
  );
}
