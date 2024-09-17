import { getWatchlistMovies } from "@/lib/actions/database";
import { fetchMoviesByIdsWithDbStatus } from "@/lib/actions/API";
import DisplayMovies from "@/components/DisplayMovies";
import { getUserInfo } from "@/lib/helpers";

export default async function Page() {
  const { userId, username } = await getUserInfo();

  const watchlistMoviesIds = await getWatchlistMovies(userId);
  const movieIdsArray = watchlistMoviesIds.movieIds;

  const watchlistMovies = await fetchMoviesByIdsWithDbStatus(
    movieIdsArray,
    userId,
  );

  return (
    <div className="mx-[4%] mb-[15px] md:mx-[8%]">
      <h2 className="mb-[20px] text-2xl font-semibold">Watchlist</h2>
      <DisplayMovies
        movies={watchlistMovies.reverse()}
        userId={userId}
        username={username}
      />
    </div>
  );
}
