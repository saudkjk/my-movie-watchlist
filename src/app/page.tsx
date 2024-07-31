"use server";
import DisplayMovies from "@/components/DisplayMovies";
import PageTitle from "@/components/PageTitle";
import { fetchMoviesTopTrending } from "@/lib/API";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Page() {
  const currentUserId = await auth().userId;
  const trendingMovies = await fetchMoviesTopTrending("fetchTrending", 1);
  const topRatedMovies = await fetchMoviesTopTrending("fetchTopRated", 1);

  return (
    <>
      <div className="flex gap-2">
        <PageTitle title="Trending" />
        <Link
          href="/genre?genre=trending&page=1"
          className="mt-5 font-semibold hover:text-blue-600 md:mt-2"
        >
          See all
        </Link>
      </div>
      <DisplayMovies movies={trendingMovies} currentUserId={currentUserId!} />

      <div className="flex gap-2">
        <PageTitle title="Top Rated" />
        <Link
          href="/genre?genre=toprated&page=1"
          className="mt-5 font-semibold hover:text-blue-600 md:mt-2"
        >
          See all
        </Link>
      </div>
      <DisplayMovies movies={topRatedMovies} currentUserId={currentUserId!} />
    </>
  );
}
