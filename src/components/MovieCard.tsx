"use client";
import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";
import { MovieCardProps } from "@/lib/types/types";
import { ImageHover } from "@/components/movie-card-components/ImageHover";
import { WatchlistButton } from "@/components/movie-card-components/WatchlistButton";
import { CompletedButton } from "@/components/movie-card-components/CompletedButton";
function MovieCard({ movie, currentUserId, isLCP }: MovieCardProps) {
  let imageURL = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
  if (imageURL.endsWith("null")) imageURL = "/posterPlaceHolder.jpg";

  return (
    <ImageHover imageURL={imageURL} isLCP={isLCP}>
      <p className="text-xs font-bold sm:text-xl">
        <Link
          href={`https://www.google.com/search?q=${movie.title} movie&newwindow=1`}
          target="_blank"
          className="hover:text-emerald-400"
        >
          {movie.title}
        </Link>
      </p>
      <p className="text-xs font-normal sm:text-sm">
        Duration: {movie.runtime ? `${movie.runtime} minutes` : "N/A"}
        <br />
        Rating: {movie.vote_average.toFixed(1)}
      </p>
      <TooltipProvider>
        <div className="mb-2 mt-1 flex">
          <WatchlistButton currentUserId={currentUserId} movie={movie} />
          <CompletedButton currentUserId={currentUserId} movie={movie} />
        </div>
      </TooltipProvider>
    </ImageHover>
  );
}
// stops re-rendering when infinitely scrolling through movies
export default React.memo(MovieCard);