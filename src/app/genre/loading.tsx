"use server";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";

export default async function Page() {
  return <MovieCardSkeleton count={10} />;
}
