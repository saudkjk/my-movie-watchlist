"use server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/db";
import React from "react";
import { fetchMoviesByIds } from "@/lib/API";
import DisplayMovies from "@/components/DisplayMovies";
import PageTitle from "@/components/PageTitle";

export default async function Page() {
  const currentUserId = await auth().userId;

  const completedMoviesIds = await prisma.completed.findMany({
    where: {
      userId: currentUserId!,
    },
  });

  const completedMovies = await fetchMoviesByIds(completedMoviesIds);

  return (
    <>
      <PageTitle title="Completed" />
      <DisplayMovies
        movies={completedMovies.reverse()}
        currentUserId={currentUserId!}
      />
    </>
  );
}
