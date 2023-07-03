import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import RoundButton from "./RoundButton";

interface Props {
  route?: string;
  customClass?: string;
}

const BackButton: FC<Props> = ({ route, customClass }) => {
  const router = useRouter();

  return (
    <>
      {route ? (
        <Link href={route} className={`h-10 w-10 p-1.5 ${customClass}`}>
          <ArrowSmallLeftIcon className="h-6 w-6 text-green-500" />
        </Link>
      ) : (
        <RoundButton
          onClick={() => router.back()}
          customClass={`h-10 w-10 p-1.5 ${customClass}`}
        >
          <ArrowSmallLeftIcon className="h-6 w-6 text-green-500" />
        </RoundButton>
      )}
    </>
  );
};

export default BackButton;
