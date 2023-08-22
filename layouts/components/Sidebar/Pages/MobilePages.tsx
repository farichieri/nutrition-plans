import {
  MdAutoGraph,
  MdPerson,
  MdLocalGroceryStore,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { AppRoutes } from "@/utils";
import { FC } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {}

const MobilePages: FC<Props> = () => {
  const router = useRouter();

  const COLLAPSED_PAGES = [
    {
      id: "tour-welcome-0",
      name: "Planner",
      url: AppRoutes.today,
      pathname: ["/app/[date]"],
      icon: <MdOutlineCalendarMonth className="h-5 w-5" />,
    },
    {
      id: "tour-search-0",
      name: "Search",
      url: "/app/search",
      pathname: ["/app/search", "/app/search/my-creations"],
      icon: <RiSearchLine className="h-5 w-5 " />,
    },
    {
      id: "",
      name: "Progress",
      url: "/app/progress",
      pathname: ["/app/progress"],
      icon: <MdAutoGraph className="h-7 w-7 " />,
    },
    {
      id: "",
      name: "Groceries",
      url: "/app/shopping/today",
      pathname: ["/app/shopping/[date]", "/app/cupboard"],
      icon: <MdLocalGroceryStore className="h-5 w-5 " />,
    },
    {
      id: "",
      name: "Profile",
      url: "/app/profile",
      pathname: [
        "/app/profile",
        "app/profile/goal",
        "/app/profile/body-features",
        "/app/profile/nutrition-values",
        "/app/profile/preferred-plan",
        "/app/profile/meals",
      ],
      icon: <MdPerson className="h-6 w-6 " />,
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
            page.pathname.includes(router.pathname)
              ? "font-semibold text-green-500 opacity-100"
              : "font-light opacity-50  dark:text-white"
          } text-md hover:opacity-7 flex w-full flex-col items-center justify-center text-center text-base  duration-300 `}
        >
          <span
            className={`${
              page.url === "/app/progress"
                ? `border-1 p-1.5 ${
                    router.pathname === page.url ? "border-green-500" : ""
                  }`
                : "border-transparent"
            } rounded-full border `}
          >
            {page.icon}
          </span>
          {page.name !== "Progress" && (
            <span className="text-xs">{page.name}</span>
          )}
        </Link>
      ))}
    </>
  );
};

export default MobilePages;
