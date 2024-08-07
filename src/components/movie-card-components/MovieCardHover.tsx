"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImageHoverProps } from "@/lib/types/types";

export const MovieCardHover = ({
  imageURL,
  children,
  childrenClassName,
  className,
  isLCP,
}: ImageHoverProps) => {
  return (
    <div
      className={cn(
        "group relative inset-0 mx-auto h-full w-full max-w-xs overflow-hidden rounded-lg bg-transparent pb-[150%] shadow-md shadow-black/40 dark:shadow-sm dark:shadow-gray-700/50",
        className,
      )}
    >
      <Image
        src={imageURL}
        alt="movie poster"
        fill
        style={{
          objectFit: "cover",
        }}
        sizes="(min-width: 1540px) 248px, (min-width: 1280px) calc(10vw + 96px), (min-width: 1040px) calc(25vw - 36px), (min-width: 780px) calc(33.33vw - 43px), calc(49.13vw - 53px)"
        className={`absolute left-0 top-0 h-full w-full transform brightness-90 transition duration-500 ease-in-out sm:brightness-100 sm:group-hover:scale-[1.10] sm:group-hover:brightness-75`}
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