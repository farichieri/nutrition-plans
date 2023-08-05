import { AppRoutes } from "@/utils";
import { FC } from "react";
import { MdFavorite } from "react-icons/md";
import { Option, Options } from "@/components";
import { useRouter } from "next/router";

interface Props {}

const FavoritesTypeSelector: FC<Props> = () => {
  const router = useRouter();
  const favoritesRoute = AppRoutes.library_favorites;
  const daysRoute = AppRoutes.library_days;
  const mealsRoute = AppRoutes.library_meals;

  const OPTIONS = [
    {
      label: "Foods",
      route: favoritesRoute,
      icon: <MdFavorite className="mr-1 h-6 w-6" />,
    },
    {
      label: "Meals",
      route: mealsRoute,
      icon: "",
    },
    {
      label: "Days",
      route: daysRoute,
      icon: "",
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
              {option.icon}
              {option.label}
            </Option>
          ))}
        </Options>
      </div>
    </div>
  );
};

export default FavoritesTypeSelector;
