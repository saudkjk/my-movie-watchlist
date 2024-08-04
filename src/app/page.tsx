"use server";
import { auth } from "@clerk/nextjs/server";
import {
  fetchMoviesTopOrTrending,
  fetchRecommendedMovies,
} from "@/lib/actions/API";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import DisplayMovies from "@/components/DisplayMovies";
import MovieCard from "@/components/MovieCard";

export default async function Page() {
  const currentUserId = (await auth().userId) || "";
  const trendingMovies = await fetchMoviesTopOrTrending("trending", 1);
  const topRatedMovies = await fetchMoviesTopOrTrending("toprated", 1);

  const recommendedMovies = await fetchRecommendedMovies(currentUserId);
  return (
    <>
      {currentUserId && (
        <>
          <div className="flex items-center gap-1">
            <PageTitle title="Based on movies you liked" />
            <a
              href="/"
              className="mt-5 max-w-[90%] rounded-md bg-background px-2 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground md:mt-2 md:text-base"
            >
              refresh
            </a>
          </div>
          <div className="mx-0 grid grid-cols-2 place-items-center gap-4 sm:grid-cols-3 md:mx-20 lg:mx-0 lg:grid-cols-6">
            {recommendedMovies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                currentUserId={currentUserId}
                isLCP={index === 0}
              />
            ))}
          </div>
        </>
      )}

      <div className="flex items-center gap-2">
        <PageTitle title="Trending" />
        <Link
          href="/trending"
          className="mt-5 max-w-[90%] rounded-md bg-background px-2 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground md:mt-2 md:text-base"
        >
          see all
        </Link>
      </div>
      <DisplayMovies movies={trendingMovies} currentUserId={currentUserId} />

      <div className="flex items-center gap-2">
        <PageTitle title="Top Rated" />
        <Link
          href="/toprated"
          className="mt-5 max-w-[90%] rounded-md bg-background px-2 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground md:mt-2 md:text-base"
        >
          see all
        </Link>
      </div>
      <DisplayMovies movies={topRatedMovies} currentUserId={currentUserId} />
    </>
  );
}
