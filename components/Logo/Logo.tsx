import Image from "next/image";
import { FC } from "react";

interface Props {
  hideText: boolean;
}

const Logo: FC<Props> = ({ hideText }) => {
  return (
    <div className="flex items-center gap-0.5 sm:gap-1">
      <Image
        src="/android-chrome-192x192.png"
        alt="logo"
        width={30}
        height={30}
      />
      {!hideText && (
        <span className="letter min-w-fit bg-gradient-to-b from-green-300 via-green-500 to-green-900 bg-clip-text text-lg font-bold tracking-tighter text-transparent">
          Nutrition Plans
        </span>
      )}
    </div>
  );
};

export default Logo;
