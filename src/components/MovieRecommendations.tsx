"use server";
import React from "react";
import { fetchRecommendedMovies } from "@/lib/actions/API";
import "swiper/css";
import MovieCardSwiper from "./MovieCardSwiper";
import PageTitle from "./PageTitle";

export default async function MovieRecommendations({
  currentUserId,
}: {
  currentUserId: string;
}) {
  const recommendedMovies = await fetchRecommendedMovies(currentUserId);
  return (
    <>
      <div className="flex items-center gap-1">
        <PageTitle title="Based on movies you liked" />
        {currentUserId && (
          <a
            href="/"
            className="mt-5 max-w-[90%] rounded-md bg-background px-2 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground md:mt-2 md:text-base"
          >
            refresh
          </a>
        )}
      </div>
      {currentUserId ? (
        <MovieCardSwiper
          movies={recommendedMovies}
          currentUserId={currentUserId}
          isRecommendations={true}
        />
      ) : (
        <div>Login to see recommendations</div>
      )}
    </>
  );
}
