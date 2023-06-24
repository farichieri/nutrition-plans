import Image from "next/image";
import { FC } from "react";

interface Props {
  hideText: boolean;
}

const Logo: FC<Props> = ({ hideText }) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Image
        src="/android-chrome-192x192.png"
        alt="logo"
        width={30}
        height={30}
      />
      {!hideText && <span>Nutrition Plans</span>}
    </div>
  );
};

export default Logo;
