"use server";
import React from "react";
import MovieCard from "./MovieCard";
import { updateWithDbStatus } from "@/lib/database";
import { DisplayMoviesProps } from "@/types/types";

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
