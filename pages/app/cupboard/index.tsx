import {
  AddFoodModalCupboard,
  CupboardDistributor,
  ShoppingNav,
  selectShoppingSlice,
} from "@/features/shopping";
import Spinner from "@/components/Loader/Spinner";
import { useSelector } from "react-redux";
import { useState } from "react";
import CupboardList from "@/features/shopping/components/cupboard_list";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";

interface Props {}

export default function Page(): Props {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { cupboard } = useSelector(selectShoppingSlice);
  const { isAddingFood } = cupboard;

  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={true} simplified>
        <ShoppingNav />
      </PremiumNav>
      <section className=" flex w-full flex-col gap-2 p-2 pb-20 sm:px-4">
        {isAddingFood && <AddFoodModalCupboard />}
        <span className="font-semibold ">Products that I have</span>
        <CupboardDistributor />
        {isLoading ? <Spinner customClass="w-5 h-5" /> : <CupboardList />}
      </section>
    </PremiumLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
