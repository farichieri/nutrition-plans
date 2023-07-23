import { MdArrowBackIosNew } from "react-icons/md";
import Link from "next/link";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "./components/Nav/PremiumNav";
import SubPremiumNav from "./components/Nav/SubPremiumNav";
import { ProfileNav } from "@/features/profile";

interface Props {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: Props) {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} />
      {/* <SubPremiumNav customClass="top-[var(--nav-h)] border-y lg:border-t-transparent ">
        <Link
          href={"/app/profile"}
          className="flex w-full items-center gap-2 px-4 "
        >
          <MdArrowBackIosNew className="h-4 w-4" />
          <span>Profile</span>ProfileLayout
        </Link>
      </SubPremiumNav> */}
      <section className="m-auto flex w-full justify-center gap-2 px-2 pb-2 pt-2 sm:px-5">
        <div className="hidden sm:flex">
          <ProfileNav />
        </div>
        <div className="flex w-full ">{children}</div>
      </section>
    </PremiumLayout>
  );
}
