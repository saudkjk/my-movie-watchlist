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
    <div className="flex flex-wrap justify-center">
      {updatedMovies.map((movie, index) => (
        <div key={movie.id}>
          <MovieCard
            movie={movie}
            currentUserId={currentUserId}
            isLCP={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
