import { selectAuthSlice } from "@/store/slices/authSlice";
import Image from "next/image";
import { FC } from "react";
import { useSelector } from "react-redux";

interface Props {
  width: number;
  height: number;
}

const Avatar: FC<Props> = ({ width, height }) => {
  const { user } = useSelector(selectAuthSlice);

  const userImage = user?.photo_url || "";
  const fisrtNameWord = user?.display_name[0]?.toLowerCase();

  return (
    <>
      {!userImage ? (
        <div
          className={`flex items-center justify-center rounded-full bg-gray-400 dark:bg-gray-700`}
        >
          <span className="text-lg opacity-80">{fisrtNameWord}</span>
        </div>
      ) : (
        <div className={`rounded-full `}>
          <Image
            className="rounded-full"
            alt="Avatar"
            src={userImage}
            height={height}
            width={width}
          />
        </div>
      )}
      <style jsx>{`
        div {
          height: ${height}px;
          width: ${width}px;
        }
      `}</style>
    </>
  );
};

export default Avatar;
