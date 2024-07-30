"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/db";
import React from "react";
import { fetchMovieById } from "@/lib/API";
import { getCommentsForUser, updateWithDatabaseStatus } from "@/lib/database";
import DisplayMovies from "@/components/DisplayMovies";
import Image from "next/image";
import DisplayComments from "@/components/DisplayComments";
import CommentForm from "@/components/CommentForm";
import { clerkClient } from "@clerk/clerk-sdk-node";
type PageProps = {
  params: {
    username: string;
  };
};

export default async function Page({ params }: PageProps) {
  const username = params.username;
  // get user id
  const usersList = await clerkClient.users.getUserList();
  const user = usersList.data.find((user) => user.username === username);
  const userId = user ? user.id : null;
  const imageUrl = user ? user.imageUrl : null;

  const users = usersList.data.map((user) => ({
    username: user.username,
    imageUrl: user.imageUrl,
    userId: user.id,
  }));

  if (!userId) {
    redirect("/browse");
  }

  const userWatchlistIds = await prisma.watchlist.findMany({
    where: {
      userId: userId,
    },
  });

  const clerkUser = await auth().userId;
  const results = await fetchMovieById(userWatchlistIds);
  const updatedResults = clerkUser ? await updateWithDatabaseStatus(String(clerkUser), results) : results;
  const comments = await getCommentsForUser(userId);

  return (
    <>
      <div className="sticky mb-4 mt-4 bg-opacity-50 md:mt-8">
        <div className="flex items-center space-x-4 px-4">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={username}
              width="50"
              height="50"
              className="rounded-full"
            />
          )}
          <div className="text-2xl font-bold text-gray-700 dark:text-gray-200 md:text-3xl">
            {username}&rsquo;s Watchlist: {results.length}
          </div>
        </div>
      </div>
      <DisplayMovies results={updatedResults} userId={clerkUser!} />
      <CommentForm
        username={username}
        targetUserId={userId}
        currentUserId={clerkUser!}
      />
      <DisplayComments comments={comments?.data || []} users={users} />
    </>
  );
}
