"use server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/db";
import React from "react";
import { fetchMovieById } from "@/lib/API";
import { updateWithDatabaseStatus } from "@/lib/database";
import DisplayMovies from "@/components/DisplayMovies";
import PageTitle from "@/components/PageTitle";

export default async function Page() {
  const clerkUser = await auth().userId;
  if (!clerkUser) auth().redirectToSignIn();

  const userCompletedlist = await prisma.completed.findMany({
    where: {
      userId: clerkUser!,
    },
  });

  const results = await fetchMovieById(userCompletedlist);
  const updatedResults = await updateWithDatabaseStatus(clerkUser!, results);

  return (
    <>
      <PageTitle title="Completed" />
      <DisplayMovies results={updatedResults.reverse()} userId={clerkUser!} />
    </>
  );
}
