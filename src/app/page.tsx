"use server";
import { auth } from "@clerk/nextjs/server";
import { fetchMoviesTopOrTrendingWithDbStatus } from "@/lib/actions/API";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import MovieRecommendations from "@/components/MovieRecommendations";
import { Suspense } from "react";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import MovieCardSwiper from "@/components/MovieCardSwiper";

export default async function Page() {
  const currentUserId = (await auth().userId) || "";

  const trendingMovies = await fetchMoviesTopOrTrendingWithDbStatus(
    "trending",
    1,
    currentUserId,
    "popularity.desc",
  );
  const topRatedMovies = await fetchMoviesTopOrTrendingWithDbStatus(
    "toprated",
    1,
    currentUserId,
    "popularity.desc",
  );

  return (
    <>
      <div className="flex items-center gap-2">
        <PageTitle title="Trending" />
        <Link
          href="/trending"
          className="mt-5 max-w-[90%] rounded-md bg-background px-2 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground md:mt-2 md:text-base"
        >
          see all
        </Link>
      </div>
      <MovieCardSwiper movies={trendingMovies} currentUserId={currentUserId} />

      <div className="flex items-center gap-2">
        <PageTitle title="Top Rated" />
        <Link
          href="/toprated"
          className="mt-5 max-w-[90%] rounded-md bg-background px-2 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground md:mt-2 md:text-base"
        >
          see all
        </Link>
      </div>
      <MovieCardSwiper movies={topRatedMovies} currentUserId={currentUserId} />

      <Suspense fallback={<MovieCardSkeleton count={3} />}>
        <MovieRecommendations currentUserId={currentUserId} />
      </Suspense>
    </>
  );
}
