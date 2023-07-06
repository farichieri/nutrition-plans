import {
  DaySelector,
  fetchDietByDate,
  getDietFoods,
  getRealDate,
  useRedirectToday,
} from "@/features/plans";
import { FoodGroup } from "@/features/foods";
import { getDaysOfWeek, getIsWeek } from "@/utils";
import { GetServerSideProps } from "next";
import { StartsOfWeek } from "@/types";
import { useEffect, useState } from "react";
import { UserAccount, selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import Spinner from "@/components/Loader/Spinner";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";
import { ShoppingNav, ShoppingList } from "@/features/shopping";

interface Props {
  date?: string;
}
export default function Page({ params }: { params: Props }) {
  const { user } = useSelector(selectAuthSlice);
  const date = getRealDate({
    date: String(params.date),
    userStartOfWeek: user?.startOfWeek || StartsOfWeek.Sunday,
  });
  useRedirectToday(String(params.date));
  const isWeek = getIsWeek(date);
  const [datesInterval, setDatesInterval] = useState<string[]>([]);
  const [foods, setFoods] = useState<FoodGroup>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getDayDiet = async (date: string, user: UserAccount) => {
    const res = await fetchDietByDate({ date, user });
    if (res.result === "success") {
      const foods = getDietFoods({ diet: res.data });
      return foods;
    }
  };

  const getDietsFoods = async (dates: string[], user: UserAccount) => {
    try {
      setIsLoading(true);
      const promises = dates.map((date) => getDayDiet(date, user));
      const res = await Promise.all(promises);
      let foods: FoodGroup = {};
      res.forEach((food) => {
        foods = { ...foods, ...food };
      });
      setFoods(foods);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
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
    if (user) {
      getDietsFoods(datesInterval, user);
    }
  }, [datesInterval]);

  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} />
      <SubPremiumNav title={""} customClass="top-[var(--subnav-h)]">
        <DaySelector date={String(params.date)} baseURL={"/app/shopping/"} />
        {/* <DateSelector /> */}
      </SubPremiumNav>
      <section className="mt-[var(--subnav-h)] flex w-full flex-col gap-5 p-2 sm:px-4">
        <ShoppingNav />
        {isLoading ? (
          <Spinner customClass="w-5 h-5" />
        ) : (
          <ShoppingList foods={foods} />
        )}
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
