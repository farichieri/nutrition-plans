import { blurDataURL } from "../Layout/BlurDataImage";
import { FC } from "react";
import { selectAuthSlice } from "@/features/authentication/slice";
import { useSelector } from "react-redux";
import Image from "next/image";

interface Props {
  width: number;
  height: number;
}

const Avatar: FC<Props> = ({ width, height }) => {
  const { user } = useSelector(selectAuthSlice);
  const userImage = user?.imageURL || "";
  const fisrtNameWord = user?.displayName[0]?.toLowerCase();

  return (
    <>
      {!userImage ? (
        <div
          className={`flex items-center justify-center rounded-full bg-red-700 text-white`}
        >
          <span className="block h-full w-full items-center justify-center text-center opacity-80">
            {fisrtNameWord}
          </span>
        </div>
      ) : (
        <div
          className={`relative flex items-center justify-center rounded-full `}
        >
          <Image
            className="flex h-full w-full items-center justify-center overflow-auto rounded-full object-cover"
            alt="Avatar"
            src={userImage}
            fill
            blurDataURL={blurDataURL(height, width)}
          />
        </div>
      )}
      <style jsx>{`
        div {
          height: ${height}px;
          width: ${width}px;
          overflow: hidden;
          min-height: ${height}px;
          min-width: ${width}px;
        }
      `}</style>
    </>
  );
};

export default Avatar;
