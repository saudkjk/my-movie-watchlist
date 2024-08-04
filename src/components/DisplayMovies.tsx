"use server";
import React from "react";
import MovieCard from "@/components/MovieCard";
import { updateWithDbStatus } from "@/lib/actions/database";
import { DisplayMoviesProps } from "@/lib/types/types";

export default async function DisplayMovies({
  movies,
  currentUserId,
}: DisplayMoviesProps) {
  const updatedMovies = currentUserId
    ? await updateWithDbStatus(currentUserId, movies)
    : movies;

  return (
    <div className="grid grid-cols-2 place-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {updatedMovies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          currentUserId={currentUserId}
          isLCP={index === 0}
        />
      ))}
    </div>
  );
}
