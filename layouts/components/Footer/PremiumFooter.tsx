import Logo from "@/components/Logo/Logo";
import Link from "next/link";
import { FC } from "react";

interface Props {}

const PremiumFooter: FC<Props> = ({}) => {
  const PAGES = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Privacy",
      href: "/privacy",
    },
    {
      title: "Terms",
      href: "/terms",
    },
  ];
  return (
    <div className="mx-auto flex min-h-[var(--footer-h)] w-full max-w-7xl flex-col items-center justify-center border-t border-gray-500/20 p-4">
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-2">
          <Logo hideText={true} />
          <span className="text-xs opacity-70">
            Copyright © 2023 Nutrition Plans LLC. All rights reserved.
          </span>
        </div>
        <ul className="m-auto flex w-full flex-wrap justify-between gap-4 p-2">
          {PAGES.map((page) => (
            <li key={page.title}>
              <Link
                className="text-xs opacity-70 duration-300 hover:opacity-100"
                href={page.href}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PremiumFooter;
