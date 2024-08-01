"use server";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { fetchMoviesByIds } from "@/lib/API";
import DisplayMovies from "@/components/DisplayMovies";
import PageTitle from "@/components/PageTitle";
import { getCompletedMoviesIds } from "@/lib/database";

// this page is only accessible to logged in users protected by the clerk auth middleware
export default async function Page() {
  const currentUserId = (await auth().userId) || "";

  const completedMoviesIds = await getCompletedMoviesIds(currentUserId);
  const completedMovies = await fetchMoviesByIds(completedMoviesIds);

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
