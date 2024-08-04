"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImageHoverProps } from "@/lib/types/types";

export const ImageHover = ({
  imageUrl,
  children,
  childrenClassName,
  className,
  isLCP,
}: ImageHoverProps) => {
  return (
    <div
      className={cn(
        "group relative inset-0 h-full w-full overflow-hidden rounded-lg bg-transparent shadow-md shadow-black/40 dark:shadow-sm dark:shadow-gray-700/50",
        className,
      )}
    >
      <Image
        alt="movie poster"
        className={`transform brightness-90 transition duration-500 ease-in-out sm:brightness-100 sm:group-hover:scale-[1.10] sm:group-hover:brightness-75`}
        fill
        src={imageUrl}
        sizes="(max-width: 480px) 35vw, (max-width: 768px) 30vw, (max-width: 992px) 25vw, (max-width: 1200px) 20vw, (max-width: 1600px) 15vw, 10vw"
        quality={80}
        priority={isLCP}
      />
      <div
        className={cn(
          "absolute bottom-0 left-2 z-40 text-white transition duration-500 ease-out sm:left-4 sm:opacity-0 sm:group-hover:opacity-100",
          childrenClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};
