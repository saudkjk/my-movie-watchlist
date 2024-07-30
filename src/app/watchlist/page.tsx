"use server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/db";
import React from "react";
import { fetchMovieById } from "@/lib/API";
import { getVisibility, updateWithDatabaseStatus } from "@/lib/database";
import DisplayMovies from "@/components/DisplayMovies";
import PageTitle from "@/components/PageTitle";
import ChangeVisibilitySwitch from "@/components/ChangeVisibilitySwitch";

export default async function Page() {
  const clerkUser = await auth().userId;
  if (!clerkUser) auth().redirectToSignIn();

  const userWatchlistIds = await prisma.watchlist.findMany({
    where: {
      userId: clerkUser!,
    },
  });

  const results = await fetchMovieById(userWatchlistIds);
  const updatedResults = await updateWithDatabaseStatus(clerkUser!, results);
  const watchListVisibility = await getVisibility(clerkUser!);

  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Watchlist" />
        <ChangeVisibilitySwitch
          userId={clerkUser!}
          watchListVisibility={watchListVisibility.isPublic}
        />
      </div>
      <DisplayMovies results={updatedResults.reverse()} userId={clerkUser!} />
    </>
  );
}
