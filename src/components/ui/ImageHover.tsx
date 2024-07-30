"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export const ImageHover = ({
  imageUrl,
  children,
  childrenClassName,
  className,
  isLCP,
}: {
  imageUrl: string;
  children: React.ReactNode | string;
  childrenClassName?: string;
  className?: string;
  isLCP?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative h-full w-full inset-0 bg-transparent rounded-lg overflow-hidden group",
        className
      )}
    >
      <Image
        alt="image"
        className={`transition duration-500 ease-in-out transform group-hover:scale-[1.10]  group-hover:brightness-75`}
        fill
        src={imageUrl}
        sizes="(max-width: 480px) 35vw, (max-width: 768px) 30vw, (max-width: 992px) 25vw, (max-width: 1200px) 20vw, (max-width: 1600px) 15vw, 10vw"
        quality={80}
      // priority={isLCP}
      />
      <div
        className={cn(
          "text-white absolute bottom-0 left-4 z-40 transition duration-500 ease-out opacity-0 group-hover:opacity-100",
          childrenClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};
