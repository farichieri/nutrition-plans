import { AppRoutes } from "@/utils";
import { FC } from "react";
import { MdFavorite } from "react-icons/md";
import { useRouter } from "next/router";

const fixedButtonClass =
  "relative flex gap-1 items-center after:absolute border-b border-b text-lg font-semibold after:bottom-[-1px] after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-green-500 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100";
const selectedClass = "after:origin-bottom-left after:scale-x-100";

interface Props {}

const FavoritesTypeSelector: FC<Props> = () => {
  const router = useRouter();
  const favoritesRoute = AppRoutes.favorites_foods;
  const favoritesPlans = AppRoutes.favorites_plans;
  const profileRoute = AppRoutes.profile;
  const isProfileRoute = router.route === profileRoute;
  const isFavoritesFoods = router.route === favoritesRoute;
  const isFavoritesPlans = router.route === favoritesPlans;

  const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const path = isFavoritesFoods ? favoritesPlans : favoritesRoute;
    router.replace({
      pathname: path,
    });
  };

  return (
    <div className="flex gap-10">
      <div className="flex w-full items-center justify-start gap-5 sm:gap-10">
        <button
          onClick={handleSelect}
          className={fixedButtonClass + (isFavoritesFoods ? selectedClass : "")}
        >
          <MdFavorite
            className={`h-6 w-6 ${
              (isFavoritesFoods || isProfileRoute) && "text-green-600"
            } `}
          />
          Foods
        </button>
        <button
          onClick={handleSelect}
          className={fixedButtonClass + (isFavoritesPlans ? selectedClass : "")}
        >
          <MdFavorite
            className={`h-6 w-6 ${isFavoritesPlans && "text-green-500"} `}
          />{" "}
          Plans
        </button>
      </div>
    </div>
  );
};

export default FavoritesTypeSelector;
