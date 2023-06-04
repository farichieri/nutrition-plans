import { Favorites } from "@/features/favorites";
import PremiumLayout from "@/layouts/PremiumLayout";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";

const App = () => {
  return (
    <PremiumLayout>
      <SubPremiumNav customClass="top-[var(--subnav-h)]">
        <span className="text-2xl font-semibold">Favorites</span>
      </SubPremiumNav>
      <section className="m-auto mt-[var(--subnav-h)] flex w-full max-w-screen-xl flex-col justify-center gap-5 px-4 pb-24 pt-8 sm:px-10">
        <Favorites />
      </section>
    </PremiumLayout>
  );
};

export default App;
