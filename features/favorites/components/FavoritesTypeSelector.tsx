import { AppRoutes } from "@/utils";
import { FC } from "react";
import { useRouter } from "next/router";

const fixedButtonClass =
  "relative after:absolute border-b border-b text-sm sm:text-lg after:bottom-[-1px] after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-green-500 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100";
const selectedClass = "after:origin-bottom-left after:scale-x-100";

interface Props {}

const FavoritesTypeSelector: FC<Props> = () => {
  const router = useRouter();
  console.log({ router });
  const favoritesRoute = AppRoutes.favorites_foods;
  const myCreationsRoute = "";
  const isFavoritesFoods = router.route === favoritesRoute;

  const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const path = isFavoritesFoods ? myCreationsRoute : favoritesRoute;

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
          Foods
        </button>
      </div>
    </div>
  );
};

export default FavoritesTypeSelector;
