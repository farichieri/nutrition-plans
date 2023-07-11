import Spinner from "@/components/Loader/Spinner";
import {
  ShoppingDistributor,
  ShoppingList,
  ShoppingNav,
  selectShoppingSlice,
} from "@/features/shopping";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";
import { useState } from "react";
import { useSelector } from "react-redux";

interface Props {}

export default function Page(): Props {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { cupboard } = useSelector(selectShoppingSlice);
  const { foods } = cupboard;

  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} simplified>
        <ShoppingNav />
      </PremiumNav>

      <section className="mt-[var(--subnav-h)] flex w-full flex-col gap-5 p-2 sm:px-4">
        <ShoppingDistributor />
        {isLoading ? <Spinner customClass="w-5 h-5" /> : <ShoppingList />}
      </section>
    </PremiumLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
