import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {}

const fixedButtonClass =
  "relative after:absolute border-b border-b text-sm sm:text-lg after:bottom-[-1px] after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-green-500 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100";
const selectedClass = "after:origin-bottom-left after:scale-x-100";

const ShoppingNav: FC<Props> = () => {
  const router = useRouter();
  const SHOPPING_PAGES = [
    {
      name: "Shopping List",
      url: `/app/shopping/today`,
      pathname: ["/app/shopping/[date]"],
    },
    {
      name: "Cupboard",
      url: `/app/cupboard`,
      pathname: ["/app/cupboard"],
    },
  ];
  return (
    <div className="flex gap-10">
      {SHOPPING_PAGES.map((page) => {
        return (
          <Link
            key={page.name}
            href={page.url}
            className={`${
              page.pathname.includes(router.route) ? selectedClass : ""
            } ${fixedButtonClass}`}
          >
            <span>{page.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default ShoppingNav;
