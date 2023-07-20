import {
  MdAutoGraph,
  MdHomeFilled,
  MdPerson,
  MdLocalGroceryStore,
} from "react-icons/md";
import { FC } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useRouter } from "next/router";
import Link from "next/link";
import { AppRoutes } from "@/utils";

interface Props {}

const MobilePages: FC<Props> = () => {
  const router = useRouter();

  const COLLAPSED_PAGES = [
    {
      name: "Home",
      url: AppRoutes.today,
      pathname: ["/app/[date]"],
      icon: <MdHomeFilled className="h-5 w-5 " />,
    },
    {
      name: "Search",
      url: "/app/search",
      pathname: ["/app/search", "/app/search/my-creations"],
      icon: <RiSearchLine className="h-5 w-5 " />,
    },
    {
      name: "Progress",
      url: "/app/progress",
      pathname: ["/app/progress"],
      icon: <MdAutoGraph className="h-5 w-5 " />,
    },
    {
      name: "Groceries",
      url: "/app/shopping/today",
      pathname: ["/app/shopping/[date]"],
      icon: <MdLocalGroceryStore className="h-5 w-5 " />,
    },
    {
      name: "Profile",
      url: "/app/profile",
      pathname: [
        "/app/profile",
        "app/profile/goal",
        "/app/profile/favorites",
        "/app/profile/body-features",
        "/app/profile/nutrition-values",
        "/app/profile/preferred-plan",
        "/app/profile/meals",
      ],
      icon: <MdPerson className="h-5 w-5 " />,
    },
  ];

  return (
    <>
      {COLLAPSED_PAGES.map((page) => (
        <Link
          key={page.name}
          href={page.url}
          className={`${
            page.pathname.includes(router.pathname)
              ? "opacity-100"
              : "opacity-50"
          } text-md hover:opacity-7 flex h-[var(--mobile-sidenav-h)] w-full flex-col items-center justify-center text-center text-base font-light text-white duration-300 `}
        >
          <span
            className={`${
              page.url === "/app/progress"
                ? " border-white p-0.5"
                : "border-transparent"
            } rounded-full border  `}
          >
            {page.icon}
          </span>
          <span className="text-xs">{page.name}</span>
        </Link>
      ))}
    </>
  );
};

export default MobilePages;
