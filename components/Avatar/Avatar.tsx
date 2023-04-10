import Image from "next/image";
import { FC } from "react";

interface Props {
  src: string | null | undefined;
  width: number;
  height: number;
}

const Avatar: FC<Props> = ({ src, width, height }) => {
  if (typeof src !== "string") {
    return <div className={`rounded-full border`}>.</div>;
  }
  return (
    <Image
      className="rounded-full"
      alt="Avatar"
      src={src}
      height={height}
      width={width}
    />
  );
};

export default Avatar;
