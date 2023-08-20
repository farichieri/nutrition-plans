import { StripeClimateIcon } from "@/assets";
import { FC } from "react";

const DonateText: FC = () => {
  return (
    <div className="m-auto flex items-center gap-2 text-xs ">
      <StripeClimateIcon customClass="w-4 h-4" />
      <span>We donate 1% of our revenue to remove CO₂ from the atmosphere</span>
    </div>
  );
};

export default DonateText;
