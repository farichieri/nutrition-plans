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
      title: "Privacy",
      href: "/privacy",
    },
    {
      title: "Terms",
      href: "/terms",
    },
  ];
  return (
    <div className="flex min-h-[var(--footer-h)] w-full flex-col items-center justify-center border-t p-4">
      <div className="w-full max-w-4xl">
        <div className="flex items-center gap-10">
          <Logo hideText={false} />
          <span className="text-sm opacity-70">
            Copyright © 2023 Nutrition Plans Inc. All rights reserved.
          </span>
        </div>
        <ul className="flex w-full flex-wrap justify-between gap-4">
          {PAGES.map((page) => (
            <li key={page.title}>
              <Link
                className="text-sm opacity-70 duration-300 hover:opacity-100"
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
