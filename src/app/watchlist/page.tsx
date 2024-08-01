"use server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/db";
import React from "react";
import { fetchMoviesByIds } from "@/lib/API";
import { getVisibility } from "@/lib/database";
import DisplayMovies from "@/components/DisplayMovies";
import PageTitle from "@/components/PageTitle";
import ChangeVisibilitySwitch from "@/components/ChangeVisibilitySwitch";

export default async function Page() {
  const currentUserId = await auth().userId;
  const watchlistMoviesIds = await prisma.watchlist.findMany({
    where: {
      userId: currentUserId!,
    },
  });

  const watchlistMovies = await fetchMoviesByIds(watchlistMoviesIds);
  const watchlistVisibility = await getVisibility(currentUserId!);

  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Watchlist" />
        <ChangeVisibilitySwitch
          userId={currentUserId!}
          watchListVisibility={watchlistVisibility.isPublic}
        />
      </div>
      <DisplayMovies
        movies={watchlistMovies.reverse()}
        currentUserId={currentUserId!}
      />
    </>
  );
}
