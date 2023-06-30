import {
  MdAutoGraph,
  MdDescription,
  MdFavorite,
  MdSearch,
  MdSettings,
  MdShoppingCart,
} from "react-icons/md";
import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {}

const CollapsedPages: FC<Props> = () => {
  const router = useRouter();

  const COLLAPSED_PAGES = [
    {
      name: "Plan",
      url: `/app/today`,
      pathname: ["/app/[date]"],
      icon: <MdDescription className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Favorites",
      url: "/app/favorites",
      pathname: ["/app/favorites"],
      icon: <MdFavorite className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Search",
      url: "/app/search",
      pathname: ["/app/search", "/app/search/my-creations"],
      icon: <MdSearch className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Progress",
      url: "/app/progress",
      pathname: ["/app/progress"],
      icon: <MdAutoGraph className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Shopping",
      url: "/app/shopping",
      pathname: ["/app/shopping"],
      icon: <MdShoppingCart className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Settings",
      url: "/app/settings",
      pathname: [
        "/app/settings",
        "/app/settings/general",
        "/app/settings/billing",
        "/app/settings/account",
      ],
      icon: <MdSettings className="h-6 w-6 text-green-500" />,
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
          } text-md hover:opacity-7 flex w-full flex-col items-center gap-1 rounded-lg border border-transparent px-1.5 py-1 text-center text-base font-medium duration-300 hover:bg-slate-500/30 active:border-gray-400 dark:active:border-white sm:text-lg`}
        >
          {page.icon}
          <span className="text-xs">{page.name}</span>
        </Link>
      ))}
    </>
  );
};

export default CollapsedPages;
