"use server";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
// import DisplayMovies from "@/components/DisplayMovies";
import PageTitle from "@/components/PageTitle";
import { fetchMoviesTopTrending } from "@/lib/API";
import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import Link from "next/link";

const DisplayMovies = dynamic(() => import("@/components/DisplayMovies"), {
  loading: () => <MovieCardSkeleton numberOfSkeletons={10} />,
});

export default async function Page() {
  const currentUserId = (await auth().userId) || "";
  const trendingMovies = await fetchMoviesTopTrending("trending", 1);
  const topRatedMovies = await fetchMoviesTopTrending("toprated", 1);

  return (
    <>
      <div className="flex gap-2">
        <PageTitle title="Trending" />
        <Link
          href="/genre?genre=trending"
          className="mt-5 font-semibold hover:text-blue-600 md:mt-2"
        >
          See all
        </Link>
      </div>
      <DisplayMovies movies={trendingMovies} currentUserId={currentUserId} />

      <div className="flex gap-2">
        <PageTitle title="Top Rated" />
        <Link
          href="/genre?genre=toprated"
          className="mt-5 font-semibold hover:text-blue-600 md:mt-2"
        >
          See all
        </Link>
      </div>
      <DisplayMovies movies={topRatedMovies} currentUserId={currentUserId} />
    </>
  );
}
