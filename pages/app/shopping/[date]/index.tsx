import { DaySelector, getRealDate, useRedirectToday } from "@/features/plans";
import {
  ShoppingNav,
  ShoppingList,
  ShoppingDistributor,
  ShoppingListFoods,
  setShoppingListFoods,
  getDietShoppingFoods,
} from "@/features/shopping";
import { firebaseAdmin } from "@/services/firebase/firebaseAdmin";
import { getDaysOfWeek, getIsWeek } from "@/utils";
import { GetServerSidePropsContext } from "next";
import { getUserData } from "@/features/authentication";
import { StartsOfWeek } from "@/types";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import nookies from "nookies";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";

interface Props {
  date?: string;
}

export default function Page({
  params,
  shoppingFoods,
}: {
  params: Props;
  shoppingFoods: ShoppingListFoods;
}) {
  const dispatch = useDispatch();
  useRedirectToday(String(params.date));

  useEffect(() => {
    dispatch(setShoppingListFoods(shoppingFoods));
  }, [shoppingFoods]);

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
  const cookies = nookies.get(context);
  let params: Props = {};

  if (context.params) {
    Object.entries(context?.params).forEach((param) => {
      if (params) {
        params[param[0] as keyof Props] = String(param[1]);
      }
    });
  }

  const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
  const { uid } = token;
  const userID = uid;
  const user = await firebaseAdmin.auth().getUser(uid);
  const date = params.date;

  if (!user || !date)
    return {
      props: {
        params,
        shoppingFoods: {},
      },
    };

  const userDataRes = await getUserData({ userID });
  if (userDataRes.result === "error") throw Error;

  const userData = userDataRes.data;
  const realDate = getRealDate({
    date: String(date),
    userStartOfWeek: userData?.startOfWeek || StartsOfWeek.Sunday,
  });
  const isWeek = getIsWeek(realDate);

  let datesInterval: string[] = [];

  if (isWeek) {
    datesInterval = getDaysOfWeek(realDate);
  } else {
    datesInterval = [realDate];
  }

  const shoppingFoods = await getDietShoppingFoods({
    dates: datesInterval,
    userID,
  });

  return {
    props: {
      params,
      shoppingFoods,
    },
  };
}
