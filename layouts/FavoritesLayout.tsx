import { Favorites, FavoritesTypeSelector } from "@/features/favorites";
import { PremiumSidebar } from "./components";
import { useRouter } from "next/router";
import { useWindowWidth } from "@/hooks";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "./components/Nav/PremiumNav";

interface Props {
  children: React.ReactNode;
}

export default function FavoritesLayout({ children }: Props) {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;

  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} />
      <PremiumSidebar />
      <section className="m-auto flex w-full max-w-screen-2xl flex-col justify-center gap-2 px-2 pb-2 pt-2 sm:px-5">
        <FavoritesTypeSelector />
        <Favorites />
      </section>
    </PremiumLayout>
  );
}
