import { DaySelector, getRealDate, useRedirectToday } from "@/features/plans";
import {
  getDietShoppingFoods,
  setShoppingListFoods,
  ShoppingDistributor,
  ShoppingList,
  ShoppingNav,
} from "@/features/shopping";
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

export default function Page({ params }: { params: Props }) {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  useRedirectToday(String(params.date));
  const date = params.date;
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
  }, [params.date]);

  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} simplified>
        <ShoppingNav />
      </PremiumNav>
      <SubPremiumNav title={""} customClass="top-[var(--nav-h)]">
        <DaySelector date={String(params.date)} baseURL={"/app/shopping/"} />
      </SubPremiumNav>
      <section className="mt-[var(--subnav-h)] flex w-full flex-col gap-5 p-2 sm:px-4">
        <ShoppingDistributor />
        <ShoppingList />
      </section>
    </PremiumLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let params: Props = {};

  if (context.params) {
    Object.entries(context?.params).forEach((param) => {
      if (params) {
        params[param[0] as keyof Props] = String(param[1]);
      }
    });
  }

  return {
    props: {
      params,
    },
  };
}
