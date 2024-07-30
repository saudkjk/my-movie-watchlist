"use server";
import DisplayMovies from "@/components/DisplayMovies";
import PageTitle from "@/components/PageTitle";
import { fetchMoviesTopTrending } from "@/lib/API";
import { updateWithDatabaseStatus } from "@/lib/database";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Page() {
  const trendingResults = await fetchMoviesTopTrending("fetchTrending", 1);
  const topRatedResults = await fetchMoviesTopTrending("fetchTopRated", 1);

  const clerkUser = await auth().userId;
  const updatedTrending = clerkUser
    ? await updateWithDatabaseStatus(String(clerkUser), trendingResults)
    : trendingResults;
  const updatedTopRated = clerkUser
    ? await updateWithDatabaseStatus(String(clerkUser), topRatedResults)
    : topRatedResults;

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
      <DisplayMovies results={updatedTrending} userId={clerkUser!} />

      <div className="flex gap-2">
        <PageTitle title="Top Rated" />
        <Link
          href="/genre?genre=toprated&page=1"
          className="mt-5 font-semibold hover:text-blue-600 md:mt-2"
        >
          See all
        </Link>
      </div>
      <DisplayMovies results={updatedTopRated} userId={clerkUser!} />
    </>
  );
}
