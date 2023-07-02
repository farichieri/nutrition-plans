import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "./components/Nav/PremiumNav";
import Link from "next/link";
import { MdArrowBackIosNew } from "react-icons/md";

interface Props {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: Props) {
  return (
    <PremiumLayout>
      <section className="m-auto flex h-full w-full max-w-screen-xl flex-col items-center justify-center  ">
        <PremiumNav hideScrolling={false} />
        <div className="flex w-full justify-center border-y py-2 text-2xl font-semibold sm:mb-5 sm:hidden">
          <Link
            href={"/app/profile"}
            className="flex w-full items-center gap-2 px-4 sm:hidden"
          >
            <MdArrowBackIosNew className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-5 p-4">
          {children}
        </div>
      </section>
    </PremiumLayout>
  );
}
