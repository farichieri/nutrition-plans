import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SubPremiumNav: FC<Props> = ({ children }) => {
  return (
    <div className="fixed left-auto top-[var(--nav-h)] z-[60] flex h-[var(--subnav-h)] w-screen items-center gap-10 border-b bg-white/80 px-4 backdrop-blur-lg dark:bg-black/80">
      {children}
    </div>
  );
};

export default SubPremiumNav;
