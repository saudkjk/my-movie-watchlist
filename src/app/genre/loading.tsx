"use server";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  return (
    <div className="container mx-auto mt-10 flex flex-wrap justify-center">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="m-1 flex h-80 w-60 flex-col space-y-4 p-3">
          <Skeleton className="h-80 w-52" />
        </div>
      ))}
    </div>
  );
}
