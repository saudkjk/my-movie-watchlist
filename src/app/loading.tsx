import MovieCardSkeleton from "@/components/MovieCardSkeleton";

export default function loading() {
  return (
    <>
      <div className="mb-[25px] h-[50vw] max-h-[80vh] w-[100vw] animate-pulse bg-gray-700 md:mb-[50px]" />
      <MovieCardSkeleton />
    </>
  );
}
