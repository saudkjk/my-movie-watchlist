"use server";
import React from "react";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";

export default async function Page() {
  return <MovieCardSkeleton numberOfSkeletons={5} />;
}
 