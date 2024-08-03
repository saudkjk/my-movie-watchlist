"use server";
import { auth } from "@clerk/nextjs/server";
import { fetchMoviesTopOrTrending } from "@/lib/actions/API";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import DisplayMovies from "@/components/DisplayMovies";

export default async function Page() {
  const currentUserId = (await auth().userId) || "";
  const trendingMovies = await fetchMoviesTopOrTrending("trending", 1, "popularity.desc");
  const topRatedMovies = await fetchMoviesTopOrTrending("toprated", 1, "popularity.desc");

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
