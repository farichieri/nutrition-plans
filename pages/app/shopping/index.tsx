import {
  AddFoodModalShopping,
  getDietShoppingFoods,
  selectShoppingSlice,
  setShoppingDateRange,
  setShoppingListFoods,
  ShoppingDistributor,
  ShoppingList,
  ShoppingNav,
} from "@/features/shopping";
import { DaySelector, getRealDate, useRedirectToday } from "@/features/plans";
import { getDaysOfWeek, getIsWeek } from "@/utils";
import { GetServerSidePropsContext } from "next";
import { selectAuthSlice } from "@/features/authentication";
import { StartsOfWeek } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";
import DateSelector from "@/components/date-selector";
import { RoundButton } from "@/components/Buttons";

interface Props {}

export default function Page() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { cupboard, shopping } = useSelector(selectShoppingSlice);
  const { isAddingFood } = cupboard;
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const handleSelectRange = ({ date }: { date: string }): void => {
    dispatch(setShoppingDateRange(date));
  };

  const handleOpenDateRange = () => {
    setIsDateRangeOpen(true);
  };

  // const getData = async () => {
  //   if (!user) return;
  //   let datesInterval = [];
  //   if (isWeek) {
  //     datesInterval = getDaysOfWeek(realDate);
  //   } else {
  //     date sInterval = [realDate];
  //   }

  //   const res = await getDietShoppingFoods({
  //     dates: datesInterval,
  //     userID: user?.id,
  //   });

  //   if (res.result === "success") {
  //     console.log("res.data", res.data);
  //     dispatch(setShoppingListFoods(res.data));
  //   }
  // };

  // useEffect(() => {
  //   if (user) {
  //     getData();
  //   }
  // }, [date]);

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
