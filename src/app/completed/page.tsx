import { getCompletedListMovies } from "@/lib/actions/database";
import { fetchMoviesByIdsWithDbStatus } from "@/lib/actions/API";
import DisplayMovies from "@/components/DisplayMovies";
import { getUserInfo } from "@/lib/helpers";

// this page is only accessible to logged in users protected by the clerk auth middleware
export default async function Page() {
  const { userId, username } = await getUserInfo();

  const completedMoviesIds = await getCompletedListMovies(userId);
  const movieIdsArray = completedMoviesIds.movieIds;

  const completedMovies = await fetchMoviesByIdsWithDbStatus(
    movieIdsArray,
    userId,
  );

  return (
    <div className="mx-[4%] mb-[15px] md:mx-[8%]">
      <h2 className="mb-[20px] text-2xl font-semibold">Completed</h2>
      <DisplayMovies
        movies={completedMovies.reverse()}
        userId={userId}
        username={username}
      />
    </div>
  );
}
