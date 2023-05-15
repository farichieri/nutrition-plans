import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import RoundButton from "../Buttons/RoundButton";

const BackButton = () => {
  const router = useRouter();

  return (
    <RoundButton onClick={() => router.back()}>
      <ArrowSmallLeftIcon className="h-6 w-6" />
    </RoundButton>
  );
};

export default BackButton;
