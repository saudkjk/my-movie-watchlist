"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export const ImageHover = ({
  imageUrl,
  children,
  childrenClassName,
  imageClassName,
  className,
}: {
  imageUrl: string;
  children: React.ReactNode | string;
  childrenClassName?: string;
  imageClassName?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-full w-full inset-0 bg-transparent rounded-lg overflow-hidden group",
        className
      )}
    >
      <div className="relative h-full w-full group-hover:block">
        <div className="hidden group-hover:block absolute inset-0 w-full h-full bg-black/40 z-10 transition duration-500" />
        <div className="h-full w-full relative bg-gray-50 dark:bg-black transition duration-500 ease-out transform group-hover:scale-[1.10]">
          <div className="relative h-full w-full">
            <Image
              alt="image"
              className={`h-full w-full ${imageClassName}`}
              fill
              src={imageUrl}
              sizes="(max-width: 480px) 70vw, (max-width: 768px) 50vw, (max-width: 992px) 35vw, (max-width: 1200px) 25vw, (max-width: 1600px) 20vw, 15vw"
              quality={80}
            />
          </div>
        </div>
        <div
          className={cn(
            "text-white absolute bottom-0 left-4 z-40 transition duration-500 ease-out opacity-0 group-hover:opacity-100",
            childrenClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
