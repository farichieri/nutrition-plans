import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  customClass?: string;
  title?: string;
}

const SubPremiumNav: FC<Props> = ({ children, customClass, title }) => {
  return (
    <div
      className={
        `fixed left-auto z-[60] flex min-h-[var(--subnav-h)] w-screen items-center gap-4 border-b bg-white/80 px-4 backdrop-blur-lg dark:bg-black/80 sm:gap-10 ` +
        customClass
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
