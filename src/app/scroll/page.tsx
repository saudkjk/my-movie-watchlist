"use server";
import React from "react";
import {
  fetchMoviesTopTrending,
  fetchMoviesTopTrendingUpdatedStatus,
} from "@/lib/API";
import PageTitle from "@/components/PageTitle";
import DisplayInfiniteMovies from "@/components/DisplayInfiniteMovies";
import DisplayMovies from "@/components/DisplayMovies";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const currentUserId = await auth().userId;
  const topRatedMovies = await fetchMoviesTopTrendingUpdatedStatus(
    "fetchTopRated",
    1,
    currentUserId!,
  );

  return (
    <>
      <PageTitle title="Completed" />
      {/* <DisplayMovies movies={topRatedMovies} currentUserId={currentUserId!} /> */}
      <DisplayInfiniteMovies movies={topRatedMovies} />
    </>
  );
}
