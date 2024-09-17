import MovieCardSkeleton from "@/components/MovieCardSkeleton";

export default async function Page() {
  return (
    <>
      <div className="mb-[25px] h-[60vw] max-h-[80vh] w-[100vw] animate-pulse bg-gray-700 md:mb-[50px]" />
      <MovieCardSkeleton />
    </>
  );
}
