import { Favorites } from "@/features/favorites";
import FavoritesTypeSelector from "@/features/favorites/components/FavoritesTypeSelector";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";

const App = () => {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} title="favorites" />
      <section className="m-auto flex w-full max-w-screen-xl flex-col justify-center gap-5 px-4 pb-24 pt-4 sm:px-5 sm:pt-4">
        <FavoritesTypeSelector />
        <Favorites />
      </section>
    </PremiumLayout>
  );
};

export default App;
