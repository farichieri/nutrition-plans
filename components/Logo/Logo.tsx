import { FC } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import Image from "next/image";

interface Props {
  hideText: boolean;
  showPremiumText?: boolean;
}

const Logo: FC<Props> = ({ hideText, showPremiumText }) => {
  const { user } = useSelector(selectAuthSlice);

  return (
    <div className="flex items-center gap-0.5 sm:gap-1">
      <Image
        src="/images/pwa/android-chrome-192x192.png"
        alt="logo"
        width={30}
        height={30}
      />
      {!hideText && (
        <span className="letter min-w-fit bg-gradient-to-b from-green-300 via-green-500 to-green-900 bg-clip-text text-lg font-bold tracking-tighter text-transparent">
          Nutrition Plans
        </span>
      )}
      {showPremiumText && user?.isPremium && (
        <span className="letter min-w-fit bg-gradient-to-b from-green-300 via-green-500 to-green-900 bg-clip-text text-lg font-bold tracking-tighter text-transparent">
          Premium
        </span>
      )}
    </div>
  );
};

export default Logo;
