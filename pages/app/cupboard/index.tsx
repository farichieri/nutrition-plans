import {
  AddFoodModalCupboard,
  CupboardDistributor,
  ShoppingNav,
  selectShoppingSlice,
} from "@/features/shopping";
import { PremiumSidebar } from "@/layouts";
import { useSelector } from "react-redux";
import { useState } from "react";
import CupboardList from "@/features/shopping/components/cupboard_list";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import Spinner from "@/components/Loader/Spinner";
import dynamic from "next/dynamic";

function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { cupboard } = useSelector(selectShoppingSlice);
  const { isAddingFood } = cupboard;

  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} simplified>
        <ShoppingNav />
      </PremiumNav>
      <PremiumSidebar />
      <div className="text-bold fixed left-1/2 top-1/2 -translate-x-1/2 rounded-xl bg-gray-500 p-10 text-sm text-green-500 sm:text-xl">
        Coming soon!
      </div>
      <section className="pointer-events-none flex h-screen w-full flex-col gap-2 p-2 pb-20 blur-md sm:px-4">
        {isAddingFood && <AddFoodModalCupboard />}
        <span className="font-semibold ">Products that I have</span>
        <CupboardDistributor />
        {isLoading ? <Spinner customClass="w-5 h-5" /> : <CupboardList />}
      </section>
    </PremiumLayout>
  );
}

export default dynamic(() => Promise.resolve(Page), { ssr: false });
