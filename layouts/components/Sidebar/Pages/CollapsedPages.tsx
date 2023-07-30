import {
  MdAutoGraph,
  MdFavorite,
  MdHomeFilled,
  MdLocalGroceryStore,
  MdPerson,
} from "react-icons/md";
import { FC } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useRouter } from "next/router";
import Link from "next/link";
import { AppRoutes } from "@/utils";

interface Props {}

const CollapsedPages: FC<Props> = () => {
  const router = useRouter();

  const COLLAPSED_PAGES = [
    {
      name: "Home",
      url: AppRoutes.today,
      pathname: ["/app/[date]"],
      icon: <MdHomeFilled className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Search",
      url: "/app/search",
      pathname: ["/app/search", "/app/search/my-creations"],
      icon: <RiSearchLine className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Progress",
      url: "/app/progress",
      pathname: ["/app/progress"],
      icon: <MdAutoGraph className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Groceries",
      url: "/app/shopping/today",
      pathname: ["/app/shopping/[date]", "/app/cupboard"],
      icon: <MdLocalGroceryStore className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Favorites",
      url: "/app/favorites",
      pathname: [
        "/app/favorites",
        "/app/favorites/meals",
        "/app/favorites/plans",
      ],
      icon: <MdFavorite className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Profile",
      url: "/app/profile",
      pathname: [
        "/app/profile",
        "/app/profile/goal",
        "/app/profile/favorites",
        "/app/profile/body-features",
        "/app/profile/nutrition-values",
        "/app/profile/preferred-plan",
        "/app/profile/meals",
      ],
      icon: <MdPerson className="h-6 w-6 text-green-500" />,
    },
  ];

  return (
    <>
      {COLLAPSED_PAGES.map((page) => (
        <Link
          key={page.name}
          href={page.url}
          className={`${
            page.pathname.includes(router.pathname) && "bg-slate-500/30  "
          } text-md hover:opacity-7 flex w-full flex-col items-center gap-1 rounded-lg border border-transparent px-1.5 py-3 text-center text-base font-medium duration-300 hover:bg-slate-500/30 active:border-gray-400 dark:active:border-white sm:text-lg`}
        >
          {page.icon}
          <span className="text-xs">{page.name}</span>
        </Link>
      ))}
    </>
  );
};

export default CollapsedPages;
