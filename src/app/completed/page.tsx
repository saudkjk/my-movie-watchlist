"use server";
import { auth } from "@clerk/nextjs/server";
import { getCompletedMoviesIds } from "@/lib/actions/database";
import { fetchMoviesByIdsWithDbStatus } from "@/lib/actions/API";
import PageTitle from "@/components/PageTitle";
import DisplayMovies from "@/components/DisplayMovies";

// this page is only accessible to logged in users protected by the clerk auth middleware
export default async function Page() {
  const currentUserId = (await auth().userId) || "";

  const completedMoviesIds = await getCompletedMoviesIds(currentUserId);
  const completedMovies = await fetchMoviesByIdsWithDbStatus(
    completedMoviesIds,
    currentUserId,
  );

  return (
    <>
      <PageTitle title="Completed" />
      <DisplayMovies
        movies={completedMovies.reverse()}
        currentUserId={currentUserId}
      />
    </>
  );
}
