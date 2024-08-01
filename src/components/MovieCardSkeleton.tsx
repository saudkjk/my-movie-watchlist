"use server";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function MovieCardSkeleton({
  numberOfSkeletons,
}: {
  numberOfSkeletons: number;
}) {
  return (
    <div className="mt-10 flex flex-wrap justify-center sm:container sm:mx-auto">
      {Array.from({ length: numberOfSkeletons }).map((_, index) => (
        <div
          key={index}
          className="mt-1 flex h-56 w-44 flex-col p-2 sm:m-1 sm:h-80 sm:w-60 sm:space-y-4 sm:p-3"
        >
          <Skeleton className="h-56 w-40 sm:h-80 sm:w-52" />
        </div>
      ))}
    </div>
  );
}
