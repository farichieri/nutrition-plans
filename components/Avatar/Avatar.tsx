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

  const userImage = user?.photoURL || "";

  return (
    <Image
      className="rounded-full"
      alt="Avatar"
      src={userImage}
      height={height}
      width={width}
    />
  );
};

export default Avatar;
