import { auth } from "@clerk/nextjs/server";
import { fetchMoviesTopOrTrendingWithDbStatus } from "@/lib/actions/API";
import PageTitle from "@/components/PageTitle";
import DisplayInfiniteMovies from "@/components/DisplayInfiniteMovies";

export default async function page() {
  const currentUserId = (await auth().userId) || "";
  const trendingMovies = await fetchMoviesTopOrTrendingWithDbStatus(
    "trending",
    1,
    currentUserId,
    "popularity.desc",
  );
  return (
    <>
      <PageTitle title={"Trending"} />
      <DisplayInfiniteMovies
        movies={trendingMovies}
        param={"trending"}
        fetchMoviesWithDbStatus={fetchMoviesTopOrTrendingWithDbStatus}
        currentUserId={currentUserId}
        sortBy={"popularity.desc"}
      />
    </>
  );
}
