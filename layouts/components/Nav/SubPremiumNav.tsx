import { selectLayoutSlice } from "@/store/slices/layoutSlice";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";

interface Props {
  children?: ReactNode;
  customClass?: string;
  title?: string;
}

const SubPremiumNav: FC<Props> = ({ children, customClass, title }) => {
  const { sidebarOpen } = useSelector(selectLayoutSlice);

  return (
    <div
      className={
        ` fixed right-0 z-[60] flex min-h-[var(--subnav-h)] w-screen items-center gap-4 border-b bg-white/80 px-1 backdrop-blur-lg dark:bg-black/80 xs:px-2 s:px-3 sm:gap-10 sm:px-4 ` +
        customClass +
        ` ${sidebarOpen ? "md:pl-60 " : "md:pl-24"} `
      }
    >
      {title && (
        <span className="min-w-fit font-semibold capitalize sm:ml-5 sm:text-xl">
          {title}
        </span>
      )}
      {children}
    </div>
  );
};

export default SubPremiumNav;
