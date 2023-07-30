import { AppRoutes } from "@/utils";
import { FC } from "react";
import { MdFavorite } from "react-icons/md";
import { useRouter } from "next/router";
import { Option, Options } from "@/components";

interface Props {}

const FavoritesTypeSelector: FC<Props> = () => {
  const router = useRouter();
  const favoritesRoute = AppRoutes.favorites_foods;
  const favoritesPlans = AppRoutes.favorites_plans;
  const favoritesMeals = AppRoutes.favorites_meals;

  const OPTIONS = [
    {
      label: "Foods",
      route: favoritesRoute,
      icon: <MdFavorite className="h-6 w-6" />,
    },
    {
      label: "Meals",
      route: favoritesMeals,
      icon: <MdFavorite className="h-6 w-6" />,
    },
    {
      label: "Plans",
      route: favoritesPlans,
      icon: <MdFavorite className="h-6 w-6" />,
    },
  ];

  return (
    <div className="flex gap-10">
      <div className="flex w-full items-center justify-start gap-5 sm:gap-10">
        <Options>
          {OPTIONS.map((option, index) => (
            <Option
              key={index}
              position={index === 0 ? "left" : index === 1 ? "middle" : "right"}
              selected={router.route === option.route}
              isLink
              href={option.route}
            >
              {option.label}
            </Option>
          ))}
        </Options>
      </div>
    </div>
  );
};

export default FavoritesTypeSelector;
