import { MdArrowBackIosNew } from "react-icons/md";
import Link from "next/link";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "./components/Nav/PremiumNav";
import SubPremiumNav from "./components/Nav/SubPremiumNav";

interface Props {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: Props) {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} />
      <SubPremiumNav customClass="top-[var(--nav-h)] border-y lg:border-t-transparent ">
        <Link
          href={"/app/profile"}
          className="flex w-full items-center gap-2 px-4 "
        >
          <MdArrowBackIosNew className="h-4 w-4" />
          <span>Profile</span>
        </Link>
      </SubPremiumNav>
      <section className="m-auto flex h-full w-full max-w-screen-xl flex-col items-center justify-center pt-[var(--nav-h)]  ">
        <div className="flex w-full flex-col items-center justify-center gap-5 p-4">
          {children}
        </div>
      </section>
    </PremiumLayout>
  );
}
