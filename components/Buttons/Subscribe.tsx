import { StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const SubscribeButton = () => {
  return (
    <button className="flex items-center justify-center gap-1">
      <StarIcon className="h-4 w-4 fill-yellow-400" />
      <span>Subscribe</span>
    </button>
  );
};

export default SubscribeButton;
