import {
  getDietShoppingFoods,
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
import { useEffect } from "react";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";

interface Props {
  date?: string;
}

export default function Page({ date }: { date: Props }) {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  useRedirectToday(String(date));
  const realDate = getRealDate({
    date: String(date),
    userStartOfWeek: user?.startOfWeek || StartsOfWeek.Sunday,
  });
  const isWeek = getIsWeek(realDate);

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
      <SubPremiumNav title={""} customClass="top-[var(--nav-h)]">
        <DaySelector date={String(date)} baseURL={"/app/shopping/"} />
      </SubPremiumNav>
      <section className="mt-[var(--subnav-h)] flex w-full flex-col gap-2 p-2 sm:px-4">
        <span className="font-semibold ">
          Products that I should buy for my planned days
        </span>
        <ShoppingDistributor />
        <ShoppingList />
      </section>
    </PremiumLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const date = context.params?.date;
  return {
    props: {
      date,
    },
  };
}
