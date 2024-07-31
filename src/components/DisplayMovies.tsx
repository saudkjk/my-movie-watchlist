"use server";
import React from "react";
import MovieCard from "./MovieCard";
import { updateWithDatabaseStatus } from "@/lib/database";

interface Movie {
  id: string;
  title: string;
  runtime?: number;
  vote_average: number;
  poster_path?: string;
  isLiked: boolean | null;
  inWatchlist: boolean | null;
  inCompleted: boolean | null;
}

interface DisplayMoviesProps {
  movies: Movie[];
  currentUserId: string;
}

export default async function DisplayMovies({
  movies,
  currentUserId,
}: DisplayMoviesProps) {
  const updatedMovies = currentUserId
    ? await updateWithDatabaseStatus(String(currentUserId), movies)
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
