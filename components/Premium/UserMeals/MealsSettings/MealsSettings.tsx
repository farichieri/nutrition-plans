import { FC } from "react";
import Link from "next/link";
import { MealsSettings } from "@/types/mealsSettingsTypes";

interface Props {
  mealsSettings: MealsSettings;
}

const MealsSettings: FC<Props> = ({ mealsSettings }) => {
  const noData = Object.keys(mealsSettings).length < 1;

  return (
    <div className="flex flex-col gap-5 rounded-md border bg-white p-5 dark:bg-black">
      <span className="text-2xl font-semibold">My Templates:</span>
      {noData ? (
        <div>No meals found</div>
      ) : (
        <div className="flex flex-wrap items-center gap-5">
          {Object.keys(mealsSettings).map((meal_id) => (
            <Link href={`/app/profile/meals/${meal_id}`} key={meal_id}>
              <span className="rounded-md border px-4 py-2 font-semibold capitalize text-green-500">
                {mealsSettings[meal_id].name}
              </span>
            </Link>
          ))}
        </div>
      )}
      <Link
        href={"/app/profile/meals/create"}
        className="w-fit rounded-md border border-green-500 bg-green-500 px-3 py-1.5 duration-100 hover:bg-green-600 active:scale-95 active:shadow-[0_0_10px_gray]"
      >
        Create meal setting
      </Link>
    </div>
  );
};

export default MealsSettings;
