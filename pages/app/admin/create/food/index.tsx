import { FoodCreate } from "@/features/foods";
import { selectAuthSlice } from "@/features/authentication/slice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PremiumLayout from "@/layouts/PremiumLayout";

export default function Page() {
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);

  useEffect(() => {
    if (user && !user.is_admin) {
      router.push("/app");
    }
  }, [user]);

  return (
    <PremiumLayout>
      {user && user.is_admin && (
        <section className="gap-10 rounded-lg bg-white p-4 shadow-[0_1px_5px_lightgray] dark:bg-black dark:shadow-[0_1px_6px_#292929] sm:m-[0.5vw] sm:px-10">
          <FoodCreate />
        </section>
      )}
    </PremiumLayout>
  );
}
