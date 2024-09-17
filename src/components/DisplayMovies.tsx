import React from "react";
import { DisplayMoviesProps } from "@/lib/types/types";
import MovieCard from "./movie-card-components/MovieCard";

export default async function DisplayMovies({
  movies,
  userId,
  username,
}: DisplayMoviesProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-[50px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          userId={userId}
          username={username}
        />
      ))}
    </div>
  );
}
