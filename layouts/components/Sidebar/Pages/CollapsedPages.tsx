import { AppRoutes } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import {
  MdAutoGraph,
  MdLibraryBooks,
  MdOutlineCalendarMonth,
  MdPerson,
} from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";

interface Props {}

const CollapsedPages: FC<Props> = () => {
  const router = useRouter();

  const COLLAPSED_PAGES = [
    {
      id: "tour-welcome-0",
      name: "Planner",
      url: AppRoutes.today,
      pathname: ["/app/[date]"],
      icon: <MdOutlineCalendarMonth className="h-6 w-6 text-green-500" />,
    },
    {
      id: "tour-search-0",
      name: "Search",
      url: "/app/search",
      pathname: ["/app/search", "/app/search/my-creations"],
      icon: <RiSearchLine className="h-6 w-6 text-green-500" />,
    },
    {
      id: "tour-progress-0",
      name: "Progress",
      url: "/app/progress",
      pathname: ["/app/progress"],
      icon: <MdAutoGraph className="h-6 w-6 text-green-500" />,
    },
    // {
    //   id: "",
    //   name: "Groceries",
    //   url: "/app/shopping/today",
    //   pathname: ["/app/shopping/[date]", "/app/cupboard"],
    //   icon: <MdLocalGroceryStore className="h-6 w-6 text-green-500" />,
    // },
    {
      id: "tour-library-0",
      name: "Library",
      url: "/app/library/favorites",
      pathname: [
        "/app/library/favorites",
        "/app/library/meals",
        "/app/library/days",
      ],
      icon: <MdLibraryBooks className="h-6 w-6 text-green-500" />,
    },
    {
      id: "tour-profile-0",
      name: "Profile",
      url: "/app/profile",
      pathname: [
        "/app/profile",
        "/app/profile/goal",
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
          id={page.id}
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
