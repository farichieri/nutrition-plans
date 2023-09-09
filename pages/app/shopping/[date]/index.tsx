import {
  getDietShoppingFoods,
  selectShoppingSlice,
  setShoppingListFoods,
  ShoppingNav,
} from "@/features/shopping";
import { DaySelector, getRealDate, useRedirectToday } from "@/features/plans";
import { getDaysOfWeek, getIsWeek } from "@/utils";
import { PremiumSidebar } from "@/layouts";
import { selectAuthSlice } from "@/features/authentication";
import { StartsOfWeek } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";
import { useRouter } from "next/router";

interface Props {}

export default function Page() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { cupboard } = useSelector(selectShoppingSlice);
  const router = useRouter();
  const { isAddingFood } = cupboard;
  const date = router.query.date;
  useRedirectToday(String(date));
  const realDate = getRealDate({
    date: String(date),
    userStartOfWeek: user?.startOfWeek || StartsOfWeek.Sunday,
  });
  const isWeek = getIsWeek(realDate);
  const isMobile = window.innerWidth < 1024;

  const getData = async () => {
    if (!user) return;
    let datesInterval = [];
    if (isWeek) {
      datesInterval = getDaysOfWeek(realDate);
    } else {
      datesInterval = [realDate];
    }

    const res = await getDietShoppingFoods({
      dates: datesInterval,
      userID: user?.id,
    });

    if (res.result === "success") {
      console.log("res.data", res.data);
      dispatch(setShoppingListFoods(res.data));
    }
  };

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [date]);

  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} simplified>
        <ShoppingNav />
      </PremiumNav>
      <PremiumSidebar hideScrolling={isMobile} />
      <div className="text-bold fixed left-1/2 top-1/2 -translate-x-1/2 rounded-xl bg-gray-500 p-10 text-sm text-green-500 sm:text-xl">
        Coming soon!
      </div>
      <div className="blur-md">
        <SubPremiumNav title={""} customClass="top-[var(--nav-h)]">
          <DaySelector date={String(date)} baseURL={"/app/shopping/"} />
        </SubPremiumNav>
        {/* <section className="pointer-events-none flex h-screen w-full flex-col gap-2 p-2 pb-20 blur-md sm:px-4">
          {isAddingFood && <AddFoodModalShopping />}
          <span className="font-semibold ">
            Products that I should buy for my planned days
          </span>
          <ShoppingDistributor />
          <ShoppingList />
        </section> */}
      </div>
    </PremiumLayout>
  );
}
