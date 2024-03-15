import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import { FC } from "react";
import { MealsSettings } from "@/features/meals";
import Link from "next/link";
import { MdOutlineModeEditOutline } from "react-icons/md";

interface Props {
  mealsSettings: MealsSettings;
}

const UserMealsSettings: FC<Props> = ({ mealsSettings }) => {
  const noData = Object.keys(mealsSettings).length < 1;

  return (
    <Box id="tour-profile_meals-3" customClass="max-w-3xl">
      <BoxMainContent customClass="flex-col gap-5">
        <div className="flex flex-wrap items-baseline">
          <span className="text-2xl font-semibold">My Templates:</span>
        </div>
        {noData ? (
          <div>No meals found</div>
        ) : (
          <div className="flex flex-col gap-1 ">
            {Object.keys(mealsSettings).map((meal_id) => (
              <Link
                className="flex items-center justify-between rounded-md border px-4 py-2 font-semibold capitalize text-green-500 hover:bg-green-500/20"
                href={`/app/profile/meals/${meal_id}`}
                key={meal_id}
              >
                <span>{mealsSettings[meal_id].name}</span>
                <MdOutlineModeEditOutline />
              </Link>
            ))}
          </div>
        )}
      </BoxMainContent>
      <BoxBottomBar>
        <Link
          id="tour-profile_meals-4"
          href={"/app/profile/meals/create"}
          className="ml-auto w-fit rounded-md border border-green-500 bg-green-500 px-3 py-1.5 duration-100 hover:bg-green-600 active:shadow-[0_0_10px_gray]"
        >
          Create meal template
        </Link>
      </BoxBottomBar>
    </Box>
  );
};

export default UserMealsSettings;
