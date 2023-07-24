import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";
import Link from "next/link";
import { FC } from "react";
import { MdArrowBackIosNew } from "react-icons/md";

interface Props {
  customClass?: string;
  href: string;
  title: string;
}

const BackNav: FC<Props> = ({ customClass, href, title }) => {
  return (
    <SubPremiumNav
      customClass={` top-[var(--nav-h)] border-b  + ${customClass}`}
    >
      <Link href={href} className="flex w-full items-center gap-4 px-4 ">
        <MdArrowBackIosNew className="h-4 w-4 rounded-full  text-green-500" />
        <span className="">{title}</span>
      </Link>
    </SubPremiumNav>
  );
};

export default BackNav;
