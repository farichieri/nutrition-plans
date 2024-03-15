"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PremiumNav, SubPremiumNav } from "@/components";
import { RoundButton } from "@/components/Buttons";
import DateSelector from "@/components/date-selector";
import {
  AddFoodModalShopping,
  ShoppingDistributor,
  ShoppingList,
  ShoppingNav,
  selectShoppingSlice,
  setShoppingDateRange,
} from "@/features/shopping";
import PremiumLayout from "@/layouts/PremiumLayout";

function Page() {
  const dispatch = useDispatch();
  const { cupboard } = useSelector(selectShoppingSlice);
  const { isAddingFood } = cupboard;
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const handleSelectRange = ({ date }: { date: string }): void => {
    dispatch(setShoppingDateRange(date));
  };

  const handleOpenDateRange = () => {
    setIsDateRangeOpen(true);
  };

  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} simplified>
        <ShoppingNav />
      </PremiumNav>
      <SubPremiumNav title={""} customClass="top-[var(--nav-h)]">
        <RoundButton customClass="p-1.5" onClick={handleOpenDateRange}>
          <DateSelector
            setIsDateRangeOpen={setIsDateRangeOpen}
            isDateRangeOpen={isDateRangeOpen}
            handleSelectRange={handleSelectRange}
          />
        </RoundButton>
      </SubPremiumNav>
      <section className="mt-[var(--subnav-h)] flex w-full flex-col gap-2 p-2 pb-20 sm:px-4">
        {isAddingFood && <AddFoodModalShopping />}
        <span className="font-semibold ">
          Products that I should buy for my planned days
        </span>
        <ShoppingDistributor />
        <ShoppingList />
      </section>
    </PremiumLayout>
  );
}

export default dynamic(() => Promise.resolve(Page), { ssr: false });
