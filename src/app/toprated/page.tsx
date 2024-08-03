import { auth } from "@clerk/nextjs/server";
import { fetchMoviesTopOrTrendingWithDbStatus } from "@/lib/actions/API";
import PageTitle from "@/components/PageTitle";
import DisplayInfiniteMovies from "@/components/DisplayInfiniteMovies";

export default async function page() {
  const currentUserId = (await auth().userId) || "";
  const trendingMovies = await fetchMoviesTopOrTrendingWithDbStatus(
    "toprated",
    1,
    currentUserId,
  );
  return (
    <>
      <PageTitle title={"Top Rated"} />
      <DisplayInfiniteMovies
        movies={trendingMovies}
        param={"toprated"}
        fetchMoviesWithDbStatus={fetchMoviesTopOrTrendingWithDbStatus}
        currentUserId={currentUserId}
        sortBy={"popularity.desc"}
      />
    </>
  );
}
