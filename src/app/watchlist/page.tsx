"use server";
import { auth } from "@clerk/nextjs/server";
import { getVisibility, getWatchlistMoviesIds } from "@/lib/actions/database";
import { fetchMoviesByIds } from "@/lib/actions/API";
import PageTitle from "@/components/PageTitle";
import ChangeVisibilitySwitch from "@/components/ChangeVisibilitySwitch";
import DisplayMovies from "@/components/DisplayMovies";

// this page is only accessible to logged in users protected by the clerk auth middleware
export default async function Page() {
  const currentUserId = (await auth().userId) || "";

  const watchlistMoviesIds = await getWatchlistMoviesIds(currentUserId);
  const watchlistMovies = await fetchMoviesByIds(watchlistMoviesIds);
  const watchlistVisibility = await getVisibility(currentUserId!);

  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Watchlist" />
        <ChangeVisibilitySwitch
          userId={currentUserId}
          watchListVisibility={watchlistVisibility.isPublic}
        />
      </div>
      <DisplayMovies
        movies={watchlistMovies.reverse()}
        currentUserId={currentUserId}
      />
    </>
  );
}
