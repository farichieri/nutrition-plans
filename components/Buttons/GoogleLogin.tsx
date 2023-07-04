import { ReactNode } from "react";
import { GoogleIcon } from "@/assets";

const GoogleLoginButton = ({
  onClick,
  children,
}: {
  onClick: any;
  children: ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="space-between m-auto flex items-center rounded-3xl bg-[#4c8bf5] shadow-[0_1px_10px] shadow-slate-500/50 duration-300 hover:shadow-[0_1px_20px] hover:shadow-slate-500/70 active:scale-95 dark:shadow-slate-300/40 dark:hover:shadow-slate-300/50"
    >
      <span className="image">
        <GoogleIcon customClass="h-7 w-7" />
      </span>
      <span className="pl-2 pr-3 text-white">{children}</span>
      <style jsx>
        {`
          .image {
            background: white;
            border-radius: 50%;
            padding: 0.5rem;
            display: flex;
          }
        `}
      </style>
    </button>
  );
};

export default GoogleLoginButton;
