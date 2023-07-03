import {
  DaySelector,
  fetchDietByDate,
  getDietFoods,
  getRealDate,
  useRedirectToday,
} from "@/features/plans";
import { getDaysOfWeek, getIsWeek } from "@/utils";
import { GetServerSideProps } from "next";
import { UserAccount, selectAuthSlice } from "@/features/authentication";
import { ShoppingList } from "@/features/shopping";
import { StartsOfWeek } from "@/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";

interface Props {
  date?: string;
}
export default function Page({ params }: { params: Props }) {
  const { user } = useSelector(selectAuthSlice);
  const date = getRealDate({
    date: String(params.date),
    userStartOfWeek: StartsOfWeek[user?.startOfWeek || "sunday"],
  });
  useRedirectToday(String(params.date));
  const isWeek = getIsWeek(date);

  const [datesInterval, setDatesInterval] = useState<string[]>([]);

  const getDayDiet = async (date: string, user: UserAccount) => {
    const res = await fetchDietByDate({ date, user });
    if (res.result === "success") {
      const foods = getDietFoods({ diet: res.data });
      console.log(res.data);
      console.log({ foods });
    }
  };

  useEffect(() => {
    if (isWeek) {
      const weekInterval = getDaysOfWeek(date);
      weekInterval && setDatesInterval(weekInterval);
    } else {
      setDatesInterval([date]);
    }
  }, [params]);

  useEffect(() => {
    datesInterval.forEach((date) => {
      if (user) {
        getDayDiet(date, user);
      }
    });
  }, [datesInterval]);

  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} />
      <SubPremiumNav title={""} customClass="top-[var(--subnav-h)]">
        <DaySelector date={String(params.date)} baseURL={"/app/shopping/"} />
      </SubPremiumNav>
      <section className="mt-[var(--subnav-h)] flex w-full flex-col gap-5 p-4 sm:px-8">
        {/* <div className="flex flex-wrap items-center gap-1">
          <span className="text-2xl font-medium">Shopping List of:</span>
          <DateSelector />
        </div> */}
        <ShoppingList />
      </section>
    </PremiumLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let params: Props = {};

  if (context.params) {
    Object.entries(context?.params).forEach((param) => {
      if (params) {
        params[param[0] as keyof Props] = String(param[1]);
      }
    });
  }
  return { props: { params } };
};
