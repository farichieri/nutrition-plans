import { ImageI } from "@/types";
import { useState } from "react";
import Image from "next/image";

const BlurImage = ({
  image,
  customClass,
  customContainerClass,
}: {
  image: ImageI;
  customClass?: string;
  customContainerClass?: string;
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div
      className={
        `aspect-h-1 aspect-w-1 h-full w-full overflow-hidden bg-[var(--blur-color)] sm:aspect-h-3 sm:aspect-w-5 ` +
        customContainerClass
      }
    >
      <Image
        alt={image.title}
        src={image.imageURL}
        fill
        className={
          ` h-full object-cover object-center ease-in-out
              ${
                isLoading
                  ? "scale-110 blur-2xl grayscale duration-700 "
                  : "scale-100 blur-0 grayscale-0 duration-0"
              }) ` + customClass
        }
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};

export default BlurImage;