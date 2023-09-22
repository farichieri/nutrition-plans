import { AppRoutes } from "@/utils";
import { FC } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { PrimaryButton } from "@/components/Buttons";
import { User } from "@/features/authentication";
import AvatarDropDown from "@/components/DropDown/AvatarDropDown/AvatarDropDown";
import Link from "next/link";

interface Props {
  user: User | null;
  isSignup: boolean;
  isLogin: boolean;
}

const SignOrAvatar: FC<Props> = ({ user, isSignup, isLogin }) => {
  return (
    <div className="flex items-center gap-6">
      {user ? (
        <>
          <Link
            href={AppRoutes.today}
            className="flex items-center justify-center gap-1 rounded-3xl border border-green-500 bg-green-500/70 px-3 py-1.5 text-sm font-semibold duration-300 hover:bg-green-500 active:bg-green-600"
          >
            <span className="text-white">Planner</span>
            <MdArrowForwardIos className="h-4 w-4 text-white" />
          </Link>
          <div className="hidden md:flex">
            <AvatarDropDown isApp={false} />
          </div>
        </>
      ) : (
        <>
          {!isSignup && (
            <>
              {!isLogin && (
                <Link href={"/login"} className="">
                  <button className="font-semibold xs:text-sm sm:text-base">
                    Log in
                  </button>
                </Link>
              )}
              <div className="flex h-7 items-center text-xs xs:text-sm">
                <Link href="/signup">
                  <PrimaryButton onClick={() => {}} content="Sign up" />
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SignOrAvatar;
