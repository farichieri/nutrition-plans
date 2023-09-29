import { cn } from "@/utils/cn";
import { useState } from "react";
import Image from "next/image";

const BlurImage = ({
  width,
  height,
  alt,
  src,
}: {
  width: number;
  height: number;
  alt: string;
  src: string;
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="h-full w-full overflow-hidden bg-[var(--blur-color)]">
      <Image
        priority={true}
        alt={alt}
        src={src}
        width={width}
        height={height}
        className={cn(
          ` h-full object-cover object-center duration-700 ease-in-out
                ${
                  isLoading
                    ? "scale-110 blur-2xl grayscale "
                    : "scale-100 blur-0 grayscale-0 "
                }) `
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};

export default BlurImage;
