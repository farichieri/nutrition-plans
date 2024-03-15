import { Option, Options } from "@/components";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { MdKitchen, MdOutlineListAlt } from "react-icons/md";

interface Props {}

const ShoppingNav: FC<Props> = () => {
  const router = useRouter();
  const SHOPPING_PAGES = [
    {
      name: "Shopping",
      url: `/app/shopping/today`,
      pathname: ["/app/shopping/[date]"],
      icon: <MdOutlineListAlt className="mr-1 h-5 w-5" />,
    },
    {
      name: "Cupboard",
      url: `/app/cupboard`,
      pathname: ["/app/cupboard"],
      icon: <MdKitchen className="mr-1 h-5 w-5" />,
    },
  ];
  return (
    <div className="m-auto flex w-full justify-center gap-10 px-1 sm:m-0">
      <Options>
        {SHOPPING_PAGES.map((page) => {
          return (
            <Option
              key={page.name}
              position={page.name === "Shopping" ? "left" : "right"}
              selected={page.pathname.includes(router.route)}
              isLink
              href={page.url}
            >
              {page.icon}
              <span>{page.name}</span>
            </Option>
          );
        })}
      </Options>
    </div>
  );
};

export default ShoppingNav;
