import { fetchMovies } from "@/lib/actions/API";
import DisplayInfiniteMovies from "@/components/DisplayInfiniteMovies";
import { getUserInfo } from "@/lib/helpers";

export default async function page() {
  const { userId, username } = await getUserInfo();
  const trendingMovies = await fetchMovies("toprated", userId);
  return (
    <div className="mx-[4%] mb-[15px] md:mx-[8%]">
      <h2 className="mb-[20px] text-2xl font-semibold text-gray-100">
        Trending
      </h2>
      <DisplayInfiniteMovies
        movies={trendingMovies}
        param={"toprated"}
        fetchMoviesWithDbStatus={fetchMovies}
        userId={userId}
        sortBy={"popularity.desc"}
        username={username}
      />
    </div>
  );
}
