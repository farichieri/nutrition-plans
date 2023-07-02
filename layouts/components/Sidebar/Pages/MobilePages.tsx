import {
  MdAutoGraph,
  MdDescription,
  MdFavorite,
  MdPerson,
} from "react-icons/md";
import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { RiSearchLine } from "react-icons/ri";

interface Props {}

const MobilePages: FC<Props> = () => {
  const router = useRouter();

  const COLLAPSED_PAGES = [
    {
      name: "Plan",
      url: `/app/today`,
      pathname: ["/app/[date]"],
      icon: <MdDescription className="h-5 w-5 " />,
    },
    {
      name: "Favorites",
      url: "/app/favorites",
      pathname: ["/app/favorites"],
      icon: <MdFavorite className="h-5 w-5 " />,
    },
    {
      name: "Progress",
      url: "/app/progress",
      pathname: ["/app/progress"],
      icon: <MdAutoGraph className="h-5 w-5 " />,
    },
    {
      name: "Search",
      url: "/app/search",
      pathname: ["/app/search", "/app/search/my-creations"],
      icon: <RiSearchLine className="h-5 w-5 " />,
    },
    {
      name: "Profile",
      url: "/app/profile",
      pathname: ["/app/profile"],
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
              ? "opacity-100  "
              : "opacity-50"
          } text-md hover:opacity-7 flex w-full flex-col items-center justify-end gap-0 border border-transparent py-1 text-center text-base font-light text-white duration-300 `}
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
