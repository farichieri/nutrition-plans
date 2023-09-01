import { StripeClimateIcon } from "@/assets";
import { FC } from "react";

const DonateText: FC = () => {
  return (
    <div className="sm:max-w-auto m-auto flex max-w-xs items-start gap-2 text-center text-xs sm:max-w-full ">
      <StripeClimateIcon customClass="w-4 h-4" />
      <span>We donate 1% of our revenue to remove CO₂ from the atmosphere</span>
    </div>
  );
};

export default DonateText;
