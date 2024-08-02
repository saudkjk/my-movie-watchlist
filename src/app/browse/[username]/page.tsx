"use server";
import { auth } from "@clerk/nextjs/server";
import { fetchMoviesByIds } from "@/lib/API";
import DisplayMovies from "@/components/DisplayMovies";
import Image from "next/image";
import DisplayComments from "@/components/DisplayComments";
import CommentForm from "@/components/CommentForm";
import { clerkClient } from "@clerk/clerk-sdk-node";
import PageTitle from "@/components/PageTitle";
import { getUserDetails, getWatchlistMoviesIds } from "@/lib/database";

type PagePropss = {
  params: {
    username: string;
  };
};

export default async function Page({ params }: PagePropss) {
  const username = params.username;
  const currentUserId = (await auth().userId) || "";

  const usersList = (await clerkClient.users.getUserList()).data;

  const { id: currentWatchlistUserId, imageUrl } = await getUserDetails(username, usersList);
  const watchlistMoviesIds = await getWatchlistMoviesIds(currentWatchlistUserId,);
  const movies = await fetchMoviesByIds(watchlistMoviesIds);

  return (
    <>
      <div className="my-4 flex gap-3">
        <div className="relative mt-4 h-8 w-8 md:mt-0 md:h-9 md:w-9">
          {imageUrl && (
            <Image
              fill
              alt={username}
              src={imageUrl}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-full"
            />
          )}
        </div>
        <PageTitle title={`${username}'s Watchlist: ${movies.length}`} />
      </div>

      <DisplayMovies movies={movies} currentUserId={currentUserId} />

      <CommentForm
        username={username}
        targetUserId={currentWatchlistUserId}
        currentUserId={currentUserId}
      />

      <DisplayComments
        currentWatchlistUserId={currentWatchlistUserId}
        usersList={usersList}
        currentUserId={currentUserId}
      />
    </>
  );
}
