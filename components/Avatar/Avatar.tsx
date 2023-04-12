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

  // const userImage = "";
  const userImage = user?.photoURL || "";

  return (
    <>
      {!userImage ? (
        <div className={`rounded-full bg-black`}></div>
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
