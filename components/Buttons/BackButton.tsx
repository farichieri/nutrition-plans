import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import RoundButton from "./RoundButton";

const BackButton = () => {
  const router = useRouter();

  return (
    <RoundButton onClick={() => router.back()} customClass="p-1.5 h-10 w-10">
      <ArrowSmallLeftIcon className="h-6 w-6 text-green-500" />
    </RoundButton>
  );
};

export default BackButton;
